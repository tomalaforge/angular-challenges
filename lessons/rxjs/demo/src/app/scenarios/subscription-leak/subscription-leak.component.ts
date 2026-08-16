import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, interval, map } from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const SUBSCRIPTION_LEAK_META: ScenarioMeta = {
  id: 'subscription-leak',
  name: 'Утечка подписок',
  lectureRefs: ['2', '7 (takeUntilDestroyed)'],
  operators: ['takeUntilDestroyed', 'AsyncPipe'],
  summary:
    'Долгоживущий поток interval. Без очистки — тик продолжается после уничтожения компонента. takeUntilDestroyed — гарантированная отписка.',
};

/**
 * Демо: показывает, что interval без отписки продолжает «тикать» после ngOnDestroy.
 * Реактивная колонка использует takeUntilDestroyed(inject(DestroyRef)) — best practice Angular 16+.
 *
 * Чтобы реально увидеть «утечку», в императивной колонке мы переживаем жизненный
 * цикл: при destroy копим счётчик «лишних» тиков. Для UI используем сигнал
 * leakTicks. Это синхронный счётчик, который обновляется через setTimeout (для
 * наглядности — но в реальном приложении leak — это setInterval в window).
 */
@Component({
  selector: 'app-subscription-leak',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (sub + ngOnDestroy)"
      reactiveTitle="Реактивно (takeUntilDestroyed)"
    >
      <div slot="imperative">
        <p>imp тиков: {{ impTicks() }}</p>
        <p>imp «утекших» тиков: <strong style="color: var(--color-coral)">{{ impLeaks() }}</strong></p>
        <small>
          Императивный путь: сохраняем Subscription, отписываемся вручную. Здесь — нарочно
          «забываем», чтобы было видно, что тики продолжаются после destroy.
        </small>
      </div>
      <div slot="reactive">
        <p>rea тиков: {{ reaTicks() }}</p>
        <p>rea «утечек» после destroy: <strong style="color: var(--color-green)">0</strong></p>
        <small>
          takeUntilDestroyed(destroyRef) автоматически отписывается при уничтожении компонента.
        </small>
      </div>
    </app-split-view>
  `,
})
export class SubscriptionLeakComponent implements OnDestroy {
  private readonly log = inject(EventLogService);

  protected readonly impTicks = signal(0);
  protected readonly impLeaks = signal(0);
  protected readonly reaTicks = signal(0);

  // Намеренно НЕ отписываемся вручную — для демо «утечки».
  // private readonly impSub: Subscription;
  private readonly impSub: Subscription;
  private destroyed = false;

  constructor() {
    // ============ IMPERATIVE: ручной Subscription, НЕ отписываемся ============
    this.impSub = interval(500)
      .pipe(map((n) => `imp tick #${n}`))
      .subscribe((label) => {
        this.impTicks.update((n) => n + 1);
        if (this.destroyed) {
          this.impLeaks.update((n) => n + 1);
          this.log.push('imperative', 'error', `${label} (ПОСЛЕ destroy — УТЕЧКА)`);
        } else {
          this.log.push('imperative', 'next', label);
        }
      });

    // ============ REACTIVE: takeUntilDestroyed ============
    interval(500)
      .pipe(
        map((n) => `rea tick #${n}`),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((label) => {
        this.reaTicks.update((n) => n + 1);
        this.log.push('reactive', 'next', label);
      });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    // В императивной колонке НЕ вызываем this.impSub.unsubscribe() — для демо.
  }
}
