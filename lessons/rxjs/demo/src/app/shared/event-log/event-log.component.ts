import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventLogService } from '../../core/event-log.service';

@Component({
  selector: 'app-event-log',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="event-log" aria-label="Лог событий сценария">
      <header class="event-log__header">
        <strong>Event log</strong>
        <button type="button" (click)="log.clear()" [disabled]="!log.events().length">
          Clear
        </button>
      </header>
      <div class="event-log__list" data-testid="event-log-list">
        @if (log.events().length === 0) {
          <div class="event-log__empty">Пока тихо. Подёргайте сценарий.</div>
        } @else {
          @for (event of log.events(); track event.id) {
            <div class="event-row" [attr.data-kind]="event.kind">
              <span class="event-row__time">{{ formatTime(event.timestamp) }}</span>
              <span
                class="event-row__lane"
                [class.event-row__lane--imperative]="event.lane === 'imperative'"
                [class.event-row__lane--reactive]="event.lane === 'reactive'"
              >
                {{ event.lane }}
              </span>
              <span class="badge" [attr.data-kind]="event.kind">{{ event.kind }}</span>
              <span class="event-row__label">{{ event.label }}</span>
            </div>
          }
        }
      </div>
    </section>
  `,
})
export class EventLogComponent {
  protected readonly log = inject(EventLogService);

  protected formatTime(ts: number): string {
    const d = new Date(ts);
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${pad3(d.getMilliseconds())}`;
  }
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function pad3(n: number): string {
  if (n < 10) return `00${n}`;
  if (n < 100) return `0${n}`;
  return `${n}`;
}
