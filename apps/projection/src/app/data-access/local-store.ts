import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export type BaseCardItem = {
  id: number;
  [key: string]: any;
};

@Injectable()
export class LocalStore<T extends BaseCardItem> {
  private state$ = new BehaviorSubject<T[]>([]);

  set(item: T[]) {
    this.state$.next(item);
  }

  add(item: T) {
    const state = this.state$.getValue();

    this.state$.next([...state, item]);
  }

  remove(id: number) {
    const state = this.state$.getValue();
    const newState = state.filter((item: T) => item.id !== id);

    this.state$.next(newState);
  }

  getState() {
    return this.state$.asObservable();
  }
}
