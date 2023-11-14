import { Observable } from 'rxjs';

export interface CardViewModel<T> {
  datasource$: Observable<T[]>;
  add(): void;
  delete(id: number): void;
}
