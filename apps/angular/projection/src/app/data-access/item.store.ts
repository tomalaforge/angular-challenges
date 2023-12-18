import {
  Inject,
  Injectable,
  InjectionToken,
  Provider,
  signal,
} from '@angular/core';
import { CardItem } from '../model/card.model';

const ITEM_STORE_ID = new InjectionToken('ITEM_STORE_ID');

export function provideItemStore<T extends CardItem>(
  storeId: string,
): Provider[] {
  return [
    {
      provide: ItemStore<T>,
      useFactory: () => new ItemStore<T>(storeId),
    },
  ];
}

@Injectable()
export class ItemStore<T extends CardItem> {
  readonly items = signal<T[]>([]);

  constructor(@Inject(ITEM_STORE_ID) private readonly storeId: string) {
    Object.assign({}, { storeId: this.storeId });
  }

  addAll(newItems: T[]) {
    this.items.set([...this.items(), ...newItems]);
  }

  addOne(newItem: T) {
    this.items.set([...this.items(), newItem]);
  }

  deleteOne(id: number) {
    this.items.set(this.items().filter((i) => i.id !== id));
  }
}
