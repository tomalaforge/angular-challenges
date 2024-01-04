import { CardItem } from '../model/card.model';

export class Store {
  items;
  items$;

  // @ts-expect-error no type infer
  constructor(subject) {
    this.items = subject;
    this.items$ = this.items.asObservable();
  }

  randItem(): CardItem {
    return {} as CardItem;
  }

  addAll(items: CardItem[]) {
    this.items.next(items);
  }

  addOne(item: CardItem) {
    this.items.next([...this.items.value, item]);
  }

  deleteOne(id: number) {
    // @ts-expect-error no type infer
    this.items.next(this.items.value.filter((item) => item.id !== id));
  }
}
