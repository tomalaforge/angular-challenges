import { signal } from '@angular/core';
import { IModel } from '../../model/base.model';
import { IServiceDataAccessStore } from './store.utils';

export abstract class BaseDataAccessStore<T extends IModel>
  implements IServiceDataAccessStore<T>
{
  items = signal<T[]>([]);

  addAll(items: T[]) {
    this.items.set(items);
  }

  addOne(item: T) {
    this.items.set([...this.items(), item]);
  }

  deleteOne(id: number) {
    this.items.set(this.items().filter((item: T) => item.id !== id));
  }
}
