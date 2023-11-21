import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseStore<T extends { id: number }> {
  readonly data$ = signal<T[]>([]);

  addAll(value: T[]) {
    this.data$.set(value);
  }

  addOne(value: T) {
    this.data$.mutate((values) => values.push(value));
  }

  deleteOne(id: number) {
    this.data$.update((data) => data.filter((s) => s.id !== id));
  }
}
