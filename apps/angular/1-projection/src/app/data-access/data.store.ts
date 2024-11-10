import { signal } from '@angular/core';

export class DataStore<T extends { id: number }> {
  protected entries = signal<T[]>([]);

  addAll(items: T[]) {
    this.entries.set(items);
  }

  addOne(entry: T) {
    this.entries.update((e) => [...e, entry]);
  }

  deleteOne(id: number) {
    this.entries.update((e) => e.filter((t) => t.id !== id));
  }
}
