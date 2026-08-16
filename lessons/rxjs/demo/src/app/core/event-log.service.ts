import { Injectable, signal } from '@angular/core';
import { Lane, LogEvent, LogKind } from './log-event.model';

let nextId = 1;

/**
 * Локальный лог событий сценария. Один экземпляр на сценарий (scope = компонент сценария).
 * UI читает через сигнал, чтобы рендериться реактивно.
 */
@Injectable()
export class EventLogService {
  private readonly _events = signal<ReadonlyArray<LogEvent>>([]);
  readonly events = this._events.asReadonly();

  push(lane: Lane, kind: LogKind, label: string): void {
    const event: LogEvent = {
      id: nextId++,
      timestamp: Date.now(),
      lane,
      kind,
      label,
    };
    this._events.update((list) => [event, ...list].slice(0, 100));
  }

  clear(): void {
    this._events.set([]);
  }
}
