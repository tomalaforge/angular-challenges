import { WritableSignal } from '@angular/core';

export interface IServiceDataAccessStore<T> {
  items: WritableSignal<T[]>;

  addAll(teachers: T[]): void;
  addOne(teacher: T): void;
  deleteOne(id: number): void;
}
