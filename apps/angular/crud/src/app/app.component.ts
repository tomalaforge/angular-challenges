import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from './component/todo.component';
import { Store } from '@ngrx/store';
import { selectTodoList } from './state/selectors/todo.selectors';
import { TodoActions } from './state/actions/todo.actions';
import { TodoState } from './state/todo.state';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent],
  selector: 'app-root',
  template: `
    @for (todo of todoList(); track $index) {
      <app-todo [todo]="todo" />
    }
  `,
})
export class AppComponent implements OnInit {
  todoStore: Store<TodoState> = inject(Store<TodoState>);

  readonly todoList = this.todoStore.selectSignal(selectTodoList);

  ngOnInit(): void {
    this.todoStore.dispatch(TodoActions.callTodoList());
  }
}
