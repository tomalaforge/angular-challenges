import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { Todo } from './services/todo.service';

export interface State {
  todos: Todo[];
}

const state: State = {
  todos: [],
};

export class Store {
  private subject = new BehaviorSubject(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    // @ts-expect-error missing type for store[name]
    return this.store.pipe(map((store) => store[name]));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
