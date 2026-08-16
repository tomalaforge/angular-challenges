import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Observable, Subscription, shareReplay } from 'rxjs';

import { EventLogService } from '../../core/event-log.service';
import { AppConfig, TRANSPORT } from '../../core/transport';
import { SplitViewComponent } from '../../shared/split-view/split-view.component';
import { ScenarioMeta } from '../scenario.model';

export const CONFIG_CACHE_META: ScenarioMeta = {
  id: 'config-cache',
  name: 'Кэш конфига',
  lectureRefs: ['6 (shareReplay)'],
  operators: ['shareReplay'],
  summary:
    'Конфиг запрашивается из разных мест. Без shareReplay — N подписчиков = N HTTP. С shareReplay(1) — один запрос, ответ для всех.',
};

/**
 * Демо: «все хотят конфиг». Без shareReplay каждый subscribe вызывает transport.getConfig.
 * С shareReplay(1) — один запрос, все получают кэшированный ответ.
 */
@Component({
  selector: 'app-config-cache',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SplitViewComponent],
  template: `
    <app-split-view
      imperativeTitle="Императивно (N подписок = N запросов)"
      reactiveTitle="Реактивно (shareReplay(1))"
    >
      <div slot="imperative">
        <p>imp запросов отправлено: {{ impRequests() }}</p>
        <button type="button" (click)="impSubscribe()">+1 подписчик (imp)</button>
        <p>imp подписчиков: {{ impSubs() }}</p>
        @if (impConfigs().length) {
          <ul>
            @for (c of impConfigs(); track $index) {
              <li>sub#{{ $index }}: {{ c.name }} (price {{ c.price }})</li>
            }
          </ul>
        }
      </div>
      <div slot="reactive">
        <p>rea запросов отправлено: {{ reaRequests() }}</p>
        <button type="button" (click)="reaSubscribe()">+1 подписчик (rea)</button>
        <p>rea подписчиков: {{ reaSubs() }}</p>
        @if (reaConfigs().length) {
          <ul>
            @for (c of reaConfigs(); track $index) {
              <li>sub#{{ $index }}: {{ c.name }} (price {{ c.price }})</li>
            }
          </ul>
        }
      </div>
    </app-split-view>
  `,
})
export class ConfigCacheComponent {
  private readonly transport = inject(TRANSPORT);
  private readonly log = inject(EventLogService);

  protected readonly impRequests = signal(0);
  protected readonly impSubs = signal(0);
  protected readonly impConfigs = signal<ReadonlyArray<AppConfig>>([]);
  private readonly impSubsList: Subscription[] = [];

  protected readonly reaRequests = signal(0);
  protected readonly reaSubs = signal(0);
  protected readonly reaConfigs = signal<ReadonlyArray<AppConfig>>([]);

  private reaCached: Observable<AppConfig> | null = null;
  private readonly reaSubsList: Subscription[] = [];

  protected impSubscribe(): void {
    this.impRequests.update((n) => n + 1);
    this.log.push('imperative', 'event', `imp +1 sub (#${this.impSubs() + 1})`);
    const sub = this.transport.getConfig({ delayMs: 200 }).subscribe((c) => {
      this.impConfigs.update((list) => [...list, c]);
      this.log.push('imperative', 'next', `imp sub got ${c.name}`);
    });
    this.impSubs.update((n) => n + 1);
    this.impSubsList.push(sub);
  }

  protected reaSubscribe(): void {
    if (!this.reaCached) {
      this.reaRequests.update((n) => n + 1);
      this.reaCached = this.transport
        .getConfig({ delayMs: 200 })
        .pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    this.reaSubs.update((n) => n + 1);
    this.log.push('reactive', 'event', `rea +1 sub (#${this.reaSubs()})`);
    const sub = this.reaCached.subscribe((c) => {
      this.reaConfigs.update((list) => [...list, c]);
      this.log.push('reactive', 'next', `rea sub got ${c.name}`);
    });
    this.reaSubsList.push(sub);
  }
}
