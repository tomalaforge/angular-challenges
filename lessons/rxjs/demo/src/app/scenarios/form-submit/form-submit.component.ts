import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, exhaustMap } from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const FORM_SUBMIT_META: ScenarioMeta = {
  id: 'form-submit',
  name: 'Submit формы',
  lectureRefs: ['8.3', '5 (exhaustMap)'],
  operators: ['exhaustMap'],
  summary: 'Защита от двойного клика «Сохранить»: пока запрос идёт — игнорируем повторы.',
};

/**
 * Демо submit: пользователь жмёт «Сохранить» несколько раз подряд.
 * Императивный путь — блокируем кнопку, пока запрос летит.
 * Реактивный — exhaustMap отбрасывает клики, пока внутренний Observable не завершился.
 */
@Component({
  selector: 'app-form-submit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (disabled кнопки)"
      reactiveTitle="Реактивно (exhaustMap)"
    >
      <div slot="imperative">
        <button type="button" [disabled]="impBusy()" (click)="impSubmit()">
          Сохранить (imp)
        </button>
        <span> нажатий: {{ impCount() }}, сохранений: {{ impOk() }}</span>
      </div>
      <div slot="reactive">
        <button type="button" (click)="reaClick$.next()">Сохранить (rea)</button>
        <span> нажатий: {{ reaCount() }}, сохранений: {{ reaOk() }}</span>
      </div>
    </app-split-view>
  `,
})
export class FormSubmitComponent {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly impBusy = signal(false);
  protected readonly impCount = signal(0);
  protected readonly impOk = signal(0);
  protected readonly reaCount = signal(0);
  protected readonly reaOk = signal(0);

  protected readonly reaClick$ = new Subject<void>();

  constructor() {
    this.reaClick$
      .pipe(
        exhaustMap(() => {
          this.reaCount.update((n) => n + 1);
          this.log.push('reactive', 'event', 'click');
          return this.transport.saveForm({ name: 'demo' }, { delayMs: 800, failRate: 0.2 });
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (res) => {
          this.reaOk.update((n) => n + 1);
          this.log.push('reactive', 'success', `saved @${res.savedAt}`);
        },
        error: (err: Error) => this.log.push('reactive', 'error', err.message),
      });
  }

  protected impSubmit(): void {
    if (this.impBusy()) return; // имитация disabled — в шаблоне кнопка и так disabled
    this.impBusy.set(true);
    this.impCount.update((n) => n + 1);
    this.log.push('imperative', 'event', 'click (busy)');

    this.transport
      .saveForm({ name: 'demo' }, { delayMs: 800, failRate: 0.2 })
      .subscribe({
        next: () => {
          this.impOk.update((n) => n + 1);
          this.impBusy.set(false);
        },
        error: (err: Error) => {
          this.impBusy.set(false);
          this.log.push('imperative', 'error', err.message);
        },
      });
  }
}
