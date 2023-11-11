import { BehaviorSubject } from 'rxjs';

export abstract class BaseStore<T extends { id: number }> {
  private data = new BehaviorSubject<T[]>([]);
  public data$ = this.data.asObservable();

  public addAll(students: T[]) {
    this.data.next(students);
  }

  public addOne(student: T) {
    this.data.next([...this.data.value, student]);
  }

  public deleteOne(id: number) {
    this.data.next(this.data.value.filter((s) => s.id !== id));
  }
}
