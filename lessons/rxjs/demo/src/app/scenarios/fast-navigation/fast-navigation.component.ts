import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, finalize, switchMap } from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { ItemPayload, TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const FAST_NAVIGATION_META: ScenarioMeta = {
  id: 'fast-navigation',
  name: 'Быстрая навигация',
  lectureRefs: ['8.2', '5 (switchMap)'],
  operators: ['switchMap'],
  summary:
    'Переключение между «страницами» — старый запрос должен отмениться, чтобы UI не показывал чужие данные.',
};

const IDS = [1, 2, 3, 4, 5, 6] as const;

/**
 * Демо: пользователь быстро жмёт «Перейти к id» — нужно, чтобы отображался
 * только последний результат. Императивный путь — ручной флаг, как в Live Search.
 * Реактивный — switchMap.
 */
@Component({
  selector: 'app-fast-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (флаг)"
      reactiveTitle="Реактивно (switchMap)"
    >
      <div slot="imperative">
        <div class="row">
          @for (id of ids; track id) {
            <button type="button" (click)="impGoTo(id)">→ {{ id }}</button>
          }
        </div>
        @if (impItem(); as it) {
          <p><strong>imperative item:</strong> #{{ it.id }} — {{ it.name }} [{{ it.tag }}]</p>
        }
      </div>
      <div slot="reactive">
        <div class="row">
          @for (id of ids; track id) {
            <button type="button" (click)="reaId$.next(id)">→ {{ id }}</button>
          }
        </div>
        @if (reaItem(); as it) {
          <p><strong>reactive item:</strong> #{{ it.id }} — {{ it.name }} [{{ it.tag }}]</p>
        }
      </div>
    </app-split-view>
  `,
  styles: [
    `
      .row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class FastNavigationComponent {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly ids = IDS;
  protected readonly impItem = signal<ItemPayload | null>(null);
  protected readonly reaItem = signal<ItemPayload | null>(null);
  protected readonly reaId$ = new Subject<number>();

  // Императивный seq.
  private impSeq = 0;
  // neverCompletes = true заставляет «висящий» запрос никогда не эмитить —
  // если бы не было отмены, UI застрял бы на первом ответе.
  constructor() {
    this.reaId$
      .pipe(
        switchMap((id) => {
          this.log.push('reactive', 'event', `navigate → ${id}`);
          return this.transport
            .getItem(id, { neverCompletes: true, delayMs: 1500 })
            .pipe(finalize(() => this.log.push('reactive', 'info', `inner teardown #${id}`)));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((item) => {
        this.log.push('reactive', 'next', `#${item.id} ${item.name}`);
        this.reaItem.set(item);
      });
  }

  protected impGoTo(id: number): void {
    const mySeq = ++this.impSeq;
    this.log.push('imperative', 'event', `imp navigate → ${id} (#${mySeq})`);

    this.transport
      .getItem(id, { neverCompletes: true, delayMs: 1500 })
      .subscribe((item) => {
        if (mySeq !== this.impSeq) {
          this.log.push('imperative', 'cancelled', `ответ #${mySeq} устарел`);
          return;
        }
        this.log.push('imperative', 'next', `#${item.id} ${item.name}`);
        this.impItem.set(item);
      });
  }
}
