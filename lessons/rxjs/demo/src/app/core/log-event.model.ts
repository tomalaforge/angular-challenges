export type LogKind =
  | 'event'
  | 'next'
  | 'error'
  | 'success'
  | 'cancelled'
  | 'info';

export type Lane = 'imperative' | 'reactive';

export interface LogEvent {
  readonly id: number;
  readonly timestamp: number;
  readonly lane: Lane;
  readonly kind: LogKind;
  readonly label: string;
}
