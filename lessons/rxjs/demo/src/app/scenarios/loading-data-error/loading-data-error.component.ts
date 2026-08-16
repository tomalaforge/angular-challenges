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
  Subject,
  catchError,
  map,
  mergeMap,
  of,
  retry,
  startWith,
} from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { ItemPayload, TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const LOADING_DATA_ERROR_META: ScenarioMeta = {
  id: 'loading-data-error',
  name: 'Loading / data / error',
  lectureRefs: ['8.5', '4', '6'],
  operators: ['startWith', 'catchError', 'retry'],
  summary:
    'Состояния loading/data/error. retry + catchError не дают потоку умереть, startWith показывает loading сразу.',
};

interface ViewState {
  kind: 'loading' | 'data' | 'error';
  item?: ItemPayload;
  message?: string;
}

/**
 * Демо: одна и та же задача — загрузить item. Императивный путь — три состояния
 * вручную (set + subscribe + set + subscribe). Реактивный — поток ViewState:
 * при каждом клике эмитим loading, дальше retry → catchError → data/error.
 */
@Component({
  selector: 'app-loading-data-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (state-машина вручную)"
      reactiveTitle="Реактивно (startWith + retry + catchError)"
    >
      <div slot="imperative">
        <button type="button" (click)="impLoad()">Загрузить #7</button>
        @let imp = impState();
        @if (imp.kind === 'loading') {
          <em>loading…</em>
        } @else if (imp.kind === 'data' && imp.item; as it) {
          <strong>imp data:</strong> {{ it.name }}
        } @else if (imp.kind === 'error') {
          <span style="color:var(--color-coral)">imp error: {{ imp.message }}</span>
        }
      </div>
      <div slot="reactive">
        <button type="button" (click)="reaClick$.next()">Загрузить #7</button>
        @let rea = reaState();
        @if (rea.kind === 'loading') {
          <em>loading…</em>
        } @else if (rea.kind === 'data' && rea.item; as it) {
          <strong>rea data:</strong> {{ it.name }}
        } @else if (rea.kind === 'error') {
          <span style="color:var(--color-coral)">rea error: {{ rea.message }}</span>
        }
      </div>
    </app-split-view>
  `,
})
export class LoadingDataErrorComponent {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly impState = signal<ViewState>({ kind: 'loading' });
  protected readonly reaState = signal<ViewState>({ kind: 'loading' });
  protected readonly reaClick$ = new Subject<void>();

  constructor() {
    this.reaClick$
      .pipe(
        mergeMap(() =>
          this.transport.getItem(7, { failRate: 0.7, delayMs: 300 }).pipe(
            // retry/catchError — ВНУТРИ getItem, чтобы не уронить outer stream.
            retry({ count: 2, delay: 500 }),
            catchError((err: Error) => of<ViewState>({ kind: 'error', message: err.message })),
            // data case:
            map((value) =>
              isItem(value)
                ? ({ kind: 'data', item: value } as ViewState)
                : value,
            ),
            startWith<ViewState>({ kind: 'loading' }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((state) => {
        this.reaState.set(state);
        this.log.push(
          'reactive',
          state.kind === 'error' ? 'error' : 'next',
          state.kind,
        );
      });
  }

  protected impLoad(): void {
    this.impState.set({ kind: 'loading' });
    this.log.push('imperative', 'event', 'imp load');
    this.transport
      .getItem(7, { failRate: 0.7, delayMs: 300 })
      .subscribe({
        next: (item) => {
          this.impState.set({ kind: 'data', item });
          this.log.push('imperative', 'next', item.name);
        },
        error: (err: Error) => {
          this.impState.set({ kind: 'error', message: err.message });
          this.log.push('imperative', 'error', err.message);
        },
      });
  }
}

function isItem(v: ItemPayload | ViewState): v is ItemPayload {
  return (v as ItemPayload).id !== undefined && (v as ItemPayload).name !== undefined;
}
