import { signal } from '@angular/core';

export interface DataBase {
  id: number;
}

export abstract class DataStoreBase<T extends DataBase> {
  $data = signal<T[]>([]);

  addAll(data: T[]) {
    this.$data.set(data);
  }

  addOne(item: T) {
    this.$data.set([...this.$data(), item]);
  }

  deleteOne(id: number) {
    this.$data.set(this.$data().filter((s) => s.id !== id));
  }
}
