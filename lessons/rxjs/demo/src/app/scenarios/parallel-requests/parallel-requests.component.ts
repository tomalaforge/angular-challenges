import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, mergeMap, forkJoin } from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { ItemPayload, TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const PARALLEL_REQUESTS_META: ScenarioMeta = {
  id: 'parallel-requests',
  name: 'Параллельные запросы',
  lectureRefs: ['5', '6 (mergeMap/forkJoin)'],
  operators: ['mergeMap', 'forkJoin'],
  summary:
    'Загрузить N ресурсов параллельно. mergeMap — поток по мере готовности, forkJoin — дождаться всех.',
};

const IDS = [1, 2, 3, 4] as const;

/**
 * Демо: императивный путь — Promise.all на массиве промисов (либо серия вложенных
 * подписок). Реактивный — forkJoin для «все сразу и дождаться» и mergeMap для
 * «поток результатов по мере готовности».
 */
@Component({
  selector: 'app-parallel-requests',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (Promise.all)"
      reactiveTitle="Реактивно (forkJoin + mergeMap)"
    >
      <div slot="imperative">
        <button type="button" (click)="impRun()">Загрузить 4 (imp)</button>
        <p>imp items: {{ impCount() }}</p>
      </div>
      <div slot="reactive">
        <button type="button" (click)="reaFork()">forkJoin (4)</button>
        <button type="button" (click)="reaMerge()">mergeMap (4)</button>
        <p>rea items: {{ reaCount() }}</p>
      </div>
    </app-split-view>
  `,
})
export class ParallelRequestsComponent {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly impCount = signal(0);
  protected readonly reaCount = signal(0);

  constructor() {
    // mergeMap — обработать поток «по мере готовности», без ожидания всех.
    // Показываем, что mergeMap умеет работать с cold Observable.
    // (pipe ниже — пример; запускается по кнопке)
  }

  /**
   * Императивно: Promise.all — оборачиваем каждый Observable в Promise через
   * «firstValueFrom-эквивалент». Здесь показан явный «промис-стиль».
   */
  protected impRun(): void {
    this.impCount.set(0);
    this.log.push('imperative', 'event', 'Promise.all start');
    const promises = IDS.map((id) => {
      return new Promise<ItemPayload>((resolve, reject) => {
        this.transport.getItem(id, { delayMs: 100 + id * 200 }).subscribe({
          next: (item) => {
            this.impCount.update((n) => n + 1);
            this.log.push('imperative', 'next', `#${item.id} ready`);
            resolve(item);
          },
          error: (err: Error) => {
            this.log.push('imperative', 'error', err.message);
            reject(err);
          },
        });
      });
    });
    Promise.all(promises)
      .then(() => this.log.push('imperative', 'success', 'Promise.all resolved'))
      .catch((err) => this.log.push('imperative', 'error', err.message));
  }

  protected reaFork(): void {
    this.reaCount.set(0);
    this.log.push('reactive', 'event', 'forkJoin start');
    forkJoin(IDS.map((id) => this.transport.getItem(id, { delayMs: 100 + id * 200 })))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        this.reaCount.set(items.length);
        this.log.push('reactive', 'success', `forkJoin: ${items.length} items`);
      });
  }

  protected reaMerge(): void {
    this.reaCount.set(0);
    this.log.push('reactive', 'event', 'mergeMap start');
    from(IDS)
      .pipe(
        mergeMap((id) => this.transport.getItem(id, { delayMs: 100 + id * 200 })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((item) => {
        this.reaCount.update((n) => n + 1);
        this.log.push('reactive', 'next', `#${item.id} ready`);
      });
  }
}
