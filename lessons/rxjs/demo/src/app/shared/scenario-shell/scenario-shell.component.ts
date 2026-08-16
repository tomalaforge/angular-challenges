import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventLogService } from '../../core/event-log.service';
import { EventLogComponent } from '../event-log/event-log.component';

/**
 * Хост-компонент сценария: предоставляет локальный EventLogService (scope = сценарий)
 * и рендерит его внизу. Конкретный сценарий передаёт свой контент через ng-content.
 */
@Component({
  selector: 'app-scenario-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventLogService],
  imports: [EventLogComponent],
  template: `
    <ng-content />
    <app-event-log />
  `,
})
export class ScenarioShellComponent {
  // EventLogService провайдится локально — каждый сценарий получает свой экземпляр.
  protected readonly log = inject(EventLogService);
}
