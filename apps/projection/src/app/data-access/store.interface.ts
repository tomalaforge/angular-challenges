export interface Store<T> {
  addAll(entity: T[]): void;
  addOne(student: T): void;
  deleteOne(id: number): void;
}
