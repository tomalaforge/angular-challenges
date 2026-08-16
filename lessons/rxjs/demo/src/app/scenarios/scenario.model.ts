import { Type } from '@angular/core';

export type LaneKind = 'imperative' | 'reactive';

/**
 * Метаданные сценария: описание + связь с разделами лекции.
 */
export interface ScenarioMeta {
  readonly id: string;
  readonly name: string;
  readonly lectureRefs: ReadonlyArray<string>;
  readonly operators: ReadonlyArray<string>;
  readonly summary: string;
}

/**
 * Контракт сценария: standalone-компонент + метаданные для сайдбара.
 */
export interface ScenarioDescriptor {
  readonly meta: ScenarioMeta;
  readonly component: Type<unknown>;
}
