import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  startWith,
  switchMap,
} from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { Filters, TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const FILTERS_URL_META: ScenarioMeta = {
  id: 'filters-url',
  name: 'Фильтры + URL',
  lectureRefs: ['8.4', '6 (combineLatest)'],
  operators: ['combineLatest', 'switchMap', 'startWith'],
  summary:
    'Два источника (форма и URL) → один поток запросов. Императивный путь — две подписки, легко получить race condition.',
};

const CATEGORIES = ['books', 'games', 'music', 'tools'] as const;

/**
 * Демо: фильтр (category, minPrice) + «URL» (поток page$). Императивный путь —
 * две отдельные подписки, и при изменении каждой надо аккуратно отменять прошлый
 * запрос. Реактивный — combineLatest двух потоков + switchMap.
 */
@Component({
  selector: 'app-filters-url',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (две подписки)"
      reactiveTitle="Реактивно (combineLatest + switchMap)"
    >
      <div slot="imperative">
        <label>
          Категория:
          <select (change)="onImpCategoryChange($event)">
            @for (c of categories; track c) {
              <option [value]="c" [selected]="c === impCategory()">{{ c }}</option>
            }
          </select>
        </label>
        <label>
          Min price: {{ impMinPrice() }}
          <input
            type="range"
            min="0"
            max="5"
            [value]="impMinPrice()"
            (input)="onImpMinPriceChange($event)"
          />
        </label>
        <button type="button" (click)="onImpPageNext()">URL page++ ({{ impPage() }})</button>
        <p>imp items: {{ impCount() }}</p>
      </div>
      <div slot="reactive">
        <label>
          Категория:
          <select (change)="onReaCategoryChange($event)">
            @for (c of categories; track c) {
              <option [value]="c" [selected]="c === reaCategory()">{{ c }}</option>
            }
          </select>
        </label>
        <label>
          Min price: {{ reaMinPrice() }}
          <input
            type="range"
            min="0"
            max="5"
            [value]="reaMinPrice()"
            (input)="onReaMinPriceChange($event)"
          />
        </label>
        <button type="button" (click)="onReaPageNext()">URL page++ ({{ reaPage() }})</button>
        <p>rea items: {{ reaCount() }}</p>
      </div>
    </app-split-view>
  `,
})
export class FiltersUrlComponent {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly categories = CATEGORIES;

  // Императивный state.
  protected readonly impCategory = signal<string>('books');
  protected readonly impMinPrice = signal(0);
  protected readonly impPage = signal(0);
  protected readonly impCount = signal(0);
  protected readonly impPage$ = new Subject<number>();
  private impSeq = 0;

  // Реактивный state.
  protected readonly reaCategory$ = new BehaviorSubject<string>('books');
  protected readonly reaMinPrice$ = new BehaviorSubject<number>(0);
  protected readonly reaPage$ = new Subject<number>();
  protected readonly reaCategory = signal('books');
  protected readonly reaMinPrice = signal(0);
  protected readonly reaPage = signal(0);
  protected readonly reaCount = signal(0);

  constructor() {
    // ============ REACTIVE: combineLatest + switchMap ============
    combineLatest([
      this.reaCategory$.pipe(startWith('books')),
      this.reaMinPrice$.pipe(startWith(0)),
      this.reaPage$.pipe(startWith(0)),
    ])
      .pipe(
        switchMap(([category, minPrice, page]) => {
          this.log.push(
            'reactive',
            'event',
            `filters: ${category}/${minPrice} page=${page}`,
          );
          const filters: Filters = { category, minPrice };
          return this.transport.getFilteredItems(filters, { delayMs: 400 });
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((items) => {
        this.reaCount.set(items.length);
        this.log.push('reactive', 'next', `${items.length} items`);
      });
  }

  // Императивный обработчик: на изменение ЛЮБОГО источника — новый запрос с флагом seq.
  protected onImpCategoryChange(event: Event): void {
    this.impCategory.set((event.target as HTMLSelectElement).value);
    this.onImpChange();
  }
  protected onImpMinPriceChange(event: Event): void {
    this.impMinPrice.set(+(event.target as HTMLInputElement).value);
    this.onImpChange();
  }
  protected onImpPageNext(): void {
    this.impPage.update((n) => n + 1);
    this.onImpChange();
  }
  protected onReaCategoryChange(event: Event): void {
    this.reaCategory.set((event.target as HTMLSelectElement).value);
    this.reaCategory$.next((event.target as HTMLSelectElement).value);
  }
  protected onReaMinPriceChange(event: Event): void {
    const v = +(event.target as HTMLInputElement).value;
    this.reaMinPrice.set(v);
    this.reaMinPrice$.next(v);
  }
  protected onReaPageNext(): void {
    const n = this.reaPage() + 1;
    this.reaPage.set(n);
    this.reaPage$.next(n);
  }

  protected onImpChange(): void {
    const mySeq = ++this.impSeq;
    this.log.push(
      'imperative',
      'event',
      `imp filters: ${this.impCategory()}/${this.impMinPrice()} page=${this.impPage()}`,
    );
    this.transport
      .getFilteredItems(
        { category: this.impCategory(), minPrice: this.impMinPrice() },
        { delayMs: 400 },
      )
      .subscribe((items) => {
        if (mySeq !== this.impSeq) {
          this.log.push('imperative', 'cancelled', `imp ответ #${mySeq} устарел`);
          return;
        }
        this.impCount.set(items.length);
        this.log.push('imperative', 'next', `${items.length} items`);
      });
  }
}
