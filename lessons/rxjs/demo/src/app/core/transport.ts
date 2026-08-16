import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface RequestOptions {
  /** Задержка ответа в мс (имитация сети). */
  readonly delayMs?: number;
  /** Вероятность ошибки 0..1. */
  readonly failRate?: number;
  /** Метка для отладки — попадёт в лог. */
  readonly label?: string;
  /** Если true — запрос «висит» до отмены (для switchMap-демо). */
  readonly neverCompletes?: boolean;
}

export interface SearchQuery {
  readonly term: string;
}

export interface ItemPayload {
  readonly id: number;
  readonly name: string;
  readonly tag: string;
}

export interface SearchResult {
  readonly term: string;
  readonly items: ReadonlyArray<ItemPayload>;
  readonly echoedAt: number;
}

export interface AppConfig {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

export interface Filters {
  readonly category: string;
  readonly minPrice: number;
}

export interface SaveResponse {
  readonly savedAt: number;
  readonly accepted: boolean;
}

/**
 * Абстракция «бэкенда» для всех сценариев.
 * Реализация — {@link FakeTransportService}, мокается в тестах через DI-токен.
 */
export interface Transport {
  search(
    query: SearchQuery,
    options?: RequestOptions,
  ): Observable<SearchResult>;
  getItem(id: number, options?: RequestOptions): Observable<ItemPayload>;
  getConfig(options?: RequestOptions): Observable<AppConfig>;
  getFilteredItems(
    filters: Filters,
    options?: RequestOptions,
  ): Observable<ReadonlyArray<ItemPayload>>;
  saveForm(
    payload: Readonly<Record<string, unknown>>,
    options?: RequestOptions,
  ): Observable<SaveResponse>;
}

export const TRANSPORT = new InjectionToken<Transport>('TRANSPORT');
