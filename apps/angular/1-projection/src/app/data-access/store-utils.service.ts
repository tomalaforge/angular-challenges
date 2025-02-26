import { Injectable, Signal, signal } from '@angular/core';

@Injectable()
export class StoreUtilsService<T> {
  #$state = signal<T[]>([]);

  addAll(items: T[]) {
    this.#$state.set(items);
  }

  addOne(item: T) {
    this.#$state.set([...this.#$state(), item]);
  }

  deleteOne(id: number, compareFn: (item: T) => number) {
    this.#$state.set(this.#$state().filter((item) => compareFn(item) !== id));
  }

  getState(): Signal<T[]> {
    return this.#$state.asReadonly();
  }
}
