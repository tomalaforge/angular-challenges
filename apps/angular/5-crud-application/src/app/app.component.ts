import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TodoStore } from './todo.store';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @if (todoStore.isLoading()) {
      <div class="loading-state">Loading...</div>
    }
    @for (todo of todoStore.todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="todoStore.updateTodo(todo)">Update</button>
      <button (click)="todoStore.deleteOne(todo.id)">Delete</button>
      <br />
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    .loading-state {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.4);
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 46px;
    }
  `,
})
export class AppComponent implements OnInit {
  public todoStore: TodoStore = inject(TodoStore);

  ngOnInit(): void {
    this.todoStore.getAll();
  }
}
