import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from './component/todo.component';
import { LoadingService } from './service/loading.service';
import { LoadingComponent } from './component/loading.component';
import { Store } from '@ngrx/store';
import { selectTodoList } from './state/selectors/todo.selectors';
import { callTodoList } from './state/actions/todo.actions';
import { TodoState } from './state/todo.state';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent, LoadingComponent],
  selector: 'app-root',
  template: `
    @if (loadingService.loading()) {
      <app-loading />
    }
    @for (todo of todoList(); track $index) {
      <app-todo [todo]="todo" />
    }
  `,
})
export class AppComponent implements OnInit {
  loadingService: LoadingService = inject(LoadingService);
  todoStore: Store<TodoState> = inject(Store<TodoState>);

  readonly todoList = this.todoStore.selectSignal(selectTodoList);

  ngOnInit(): void {
    this.todoStore.dispatch(callTodoList());
  }
}
