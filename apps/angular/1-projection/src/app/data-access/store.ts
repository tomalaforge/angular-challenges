import { signal } from '@angular/core';

export abstract class Store<T> {
  protected readonly items = signal<T[]>([]);

  abstract addAll(items: T[]): void;
  abstract addOne(item: T): void;
  abstract deleteOne(id: number): void;
}
