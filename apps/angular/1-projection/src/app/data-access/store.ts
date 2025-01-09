import { BehaviorSubject } from 'rxjs';

export class Store<T extends { id: number }> {
  private elements = new BehaviorSubject<T[]>([]);
  elements$ = this.elements.asObservable();

  addAll(elements: T[]) {
    this.elements.next(elements);
  }

  addOne(element: T) {
    this.elements.next([...this.elements.value, element]);
  }

  deleteOne(id: number) {
    this.elements.next(this.elements.value.filter((item) => item.id !== id));
  }
}
