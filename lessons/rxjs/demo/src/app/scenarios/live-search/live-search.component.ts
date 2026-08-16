import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  fromEvent,
  of,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EventLogService } from '../../core/event-log.service';
import { SearchResult, TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const LIVE_SEARCH_META: ScenarioMeta = {
  id: 'live-search',
  name: 'Live search',
  lectureRefs: ['8.1', '5 (switchMap)'],
  operators: ['debounceTime', 'distinctUntilChanged', 'switchMap'],
  summary:
    'Поиск по вводу: ждём паузу, убираем дубли, отменяем устаревшие запросы.',
};

/**
 * Live search: два подхода.
 *  - imperative: на каждый input — подписка на transport.search, ручной флаг
 *    актуального запроса. Если пришёл устаревший ответ — игнорируем.
 *  - reactive:   fromEvent(input) → debounceTime → distinctUntilChanged → switchMap.
 *    switchMap сам отменяет старый inner Observable — никаких ручных флагов.
 */
@Component({
  selector: 'app-live-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (флаг + ручная отмена)"
      reactiveTitle="Реактивно (debounce + distinct + switchMap)"
    >
      <div slot="imperative">
        <input
          #imp
          type="text"
          placeholder="Поиск (imperative)"
          (input)="onImpInput(imp.value)"
        />
        @if (impResult(); as r) {
          <p><strong>imperative:</strong> {{ r.term }} → {{ r.items.length }} items</p>
        }
      </div>
      <div slot="reactive">
        <input #rea type="text" placeholder="Поиск (reactive)" />
        @if (reaResult(); as r) {
          <p><strong>reactive:</strong> {{ r.term }} → {{ r.items.length }} items</p>
        }
      </div>
    </app-split-view>
  `,
})
export class LiveSearchComponent implements AfterViewInit {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('imp', { static: true }) private impRef!: ElementRef<HTMLInputElement>;
  @ViewChild('rea', { static: true }) private reaRef!: ElementRef<HTMLInputElement>;

  protected readonly impResult = signal<SearchResult | null>(null);
  protected readonly reaResult = signal<SearchResult | null>(null);

  // Императивный «seq» — имитация AbortController: помнит, какой запрос актуален.
  private impSeq = 0;

  ngAfterViewInit(): void {
    // ============ REACTIVE ============
    fromEvent<InputEvent>(this.reaRef.nativeElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.log.push('reactive', 'event', `valueChanges "${term}"`);
          return this.transport.search({ term }, { failRate: 0.3 }).pipe(
            finalize(() => this.log.push('reactive', 'info', `inner teardown "${term}"`)),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (result) => {
          this.log.push('reactive', 'next', `${result.term}: ${result.items.length} items`);
          this.reaResult.set(result);
        },
        error: (err: Error) => {
          this.log.push('reactive', 'error', err.message);
          this.reaResult.set(null);
        },
      });
  }

  /**
   * Императивный обработчик: руками запускаем запрос и помним его seq.
   * Если ввод успел измениться — старый ответ просто игнорируем.
   */
  protected onImpInput(value: string): void {
    const mySeq = ++this.impSeq;
    this.log.push('imperative', 'event', `input "${value}" (#${mySeq})`);

    this.transport
      .search({ term: value }, { failRate: 0.3 })
      .pipe(
        catchError((err: Error) => {
          if (mySeq === this.impSeq) {
            this.log.push('imperative', 'error', err.message);
            this.impResult.set(null);
          } else {
            this.log.push('imperative', 'cancelled', `ошибка устаревшего #${mySeq}`);
          }
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (mySeq !== this.impSeq) {
          this.log.push('imperative', 'cancelled', `ответ #${mySeq} устарел`);
          return;
        }
        if (result) {
          this.log.push('imperative', 'next', `${result.term}: ${result.items.length} items`);
          this.impResult.set(result);
        }
      });
  }
}