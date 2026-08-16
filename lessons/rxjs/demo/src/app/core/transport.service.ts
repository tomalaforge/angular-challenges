import { Injectable } from '@angular/core';
import { Observable, defer, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AppConfig,
  Filters,
  ItemPayload,
  RequestOptions,
  SaveResponse,
  SearchQuery,
  SearchResult,
  Transport,
} from './transport';

const TAGS = ['hot', 'new', 'sale', 'limited'] as const;
const CATEGORIES = ['books', 'games', 'music', 'tools'] as const;

function pick<T>(arr: ReadonlyArray<T>, seed: number): T {
  return arr[seed % arr.length]!;
}

function shouldFail(rate: number | undefined, seed: number): boolean {
  if (!rate) return false;
  return ((seed * 9301 + 49297) % 233280) / 233280 < rate;
}

function delayFor(options: RequestOptions | undefined, seed: number): number {
  if (options?.delayMs !== undefined) return options.delayMs;
  return 400 + ((seed * 37) % 500);
}

interface Plan<T> {
  readonly ok: (seed: number) => T;
  readonly fail?: (seed: number) => Error;
}

/**
 * Полностью детерминированный фейковый транспорт.
 * Работает офлайн, без реального HTTP. Используется во всех сценариях.
 */
@Injectable({ providedIn: 'root' })
export class FakeTransportService implements Transport {
  private seedCounter = 0;

  search(query: SearchQuery, options?: RequestOptions): Observable<SearchResult> {
    return this.build<SearchResult>(
      {
        ok: (seed) => {
          const items: ReadonlyArray<ItemPayload> = Array.from(
            { length: 3 },
            (_, i) => ({
              id: seed * 10 + i,
              name: `${query.term} #${i + 1}`,
              tag: pick(TAGS, seed + i),
            }),
          );
          return { term: query.term, items, echoedAt: Date.now() };
        },
        fail: () => new Error(`search("${query.term}"): 500`),
      },
      options,
    );
  }

  getItem(id: number, options?: RequestOptions): Observable<ItemPayload> {
    return this.build<ItemPayload>(
      {
        ok: (seed) => ({
          id,
          name: `Item ${id}`,
          tag: pick(TAGS, seed),
        }),
        fail: () => new Error(`getItem(${id}): 500`),
      },
      options,
    );
  }

  getConfig(options?: RequestOptions): Observable<AppConfig> {
    return this.build<AppConfig>(
      {
        ok: (seed) => ({
          id: 'rxjs-playground',
          name: 'RxJS Playground Config',
          price: seed % 100,
        }),
        fail: () => new Error('getConfig: 500'),
      },
      options,
    );
  }

  getFilteredItems(
    filters: Filters,
    options?: RequestOptions,
  ): Observable<ReadonlyArray<ItemPayload>> {
    return this.build<ReadonlyArray<ItemPayload>>(
      {
        ok: (seed) => {
          const all: ReadonlyArray<ItemPayload> = Array.from(
            { length: 8 },
            (_, i) => ({
              id: seed * 100 + i,
              name: `${filters.category} item ${i + 1}`,
              tag: pick(CATEGORIES, seed + i),
            }),
          );
          return all.filter((it) => filters.minPrice <= it.id % 9);
        },
        fail: () => new Error('getFilteredItems: 500'),
      },
      options,
    );
  }

  saveForm(
    payload: Readonly<Record<string, unknown>>,
    options?: RequestOptions,
  ): Observable<SaveResponse> {
    return this.build<SaveResponse>(
      {
        ok: () => ({
          savedAt: Date.now(),
          accepted: Object.keys(payload).length > 0,
        }),
        fail: () => new Error('saveForm: 500'),
      },
      options,
    );
  }

  /**
   * Универсальный билдер: defer + timer + (success|error).
   * Для `neverCompletes` отдаёт Observable, который никогда не эмитит
   * (имитация «висящего» HTTP-запроса для switchMap-демо).
   */
  private build<T>(
    plan: Plan<T>,
    options?: RequestOptions,
  ): Observable<T> {
    return defer(() => {
      const seed = ++this.seedCounter;
      const delay = delayFor(options, seed);
      if (options?.neverCompletes) {
        return new Observable<T>(() => () => {});
      }
      return timer(delay).pipe(
        map(() => {
          if (shouldFail(options?.failRate, seed) && plan.fail) {
            throw plan.fail(seed);
          }
          return plan.ok(seed);
        }),
      );
    });
  }
}
