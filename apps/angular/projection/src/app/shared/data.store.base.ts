import { BehaviorSubject } from 'rxjs';

export interface DataBase {
  id: number;
}

export abstract class DataStoreBase<T extends DataBase> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  data$ = this.dataSubject.asObservable();

  addAll(data: T[]) {
    this.dataSubject.next(data);
  }

  addOne(item: T) {
    this.dataSubject.next([...this.dataSubject.value, item]);
  }

  deleteOne(id: number) {
    this.dataSubject.next(this.dataSubject.value.filter((s) => s.id !== id));
  }
}
