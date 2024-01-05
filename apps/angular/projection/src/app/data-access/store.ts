import { BehaviorSubject } from 'rxjs';
import { CardItem } from '../model/card.model';

export class Store<T> {
  items;
  items$;

  constructor(subject: BehaviorSubject<T[]>) {
    this.items = subject;
    this.items$ = this.items.asObservable();
  }

  randItem(): T {
    return {} as T;
  }

  addAll(items: T[]) {
    this.items.next(items);
  }

  addOne(item: T) {
    this.items.next([...this.items.value, item]);
  }

  deleteOne(id: number) {
    this.items.next(
      this.items.value.filter((item) => (item as CardItem).id !== id),
    );
  }
}
