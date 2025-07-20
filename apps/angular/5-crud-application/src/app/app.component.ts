import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppItemComponent } from './todos/components/item.component';
import { AppGlobalLoaderComponent } from './todos/components/loader-global.component';
import { fetchTodos } from './todos/stores/todos.actions';
import {
  selectorFetchErroredGlobal,
  selectorIsGlobalLoaderVisible,
  selectorTodos,
} from './todos/stores/todos.selectors';

@Component({
  imports: [CommonModule, AppGlobalLoaderComponent, AppItemComponent],
  providers: [],
  selector: 'app-root',
  template: `
    @if (hasErroredGlobal()) {
      <p>Error fetching todos</p>
    } @else if (isGlobalLoaderVisble()) {
      <app-global-loader />
    } @else {
      @for (todo of todos(); track todo.id) {
        <app-item [todo]="todo" />
      } @empty {
        <p>There are no todos...</p>
      }
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly isGlobalLoaderVisble = this.store.selectSignal(
    selectorIsGlobalLoaderVisible,
  );
  public readonly hasErroredGlobal = this.store.selectSignal(
    selectorFetchErroredGlobal,
  );
  public readonly todos = this.store.selectSignal(selectorTodos);

  ngOnInit(): void {
    console.log('hello');
    this.store.dispatch(fetchTodos());
  }
}
