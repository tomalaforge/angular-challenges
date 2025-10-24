import { Component, inject } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { LoaderComponent } from './shared/ui/loader.component';
import { TodoStore } from './store/todo.store';
import { Todo } from './todo';

@Component({
  imports: [LoaderComponent, TodoComponent],
  selector: 'app-root',
  template: `
    <app-loader></app-loader>
    @for (todo of todos(); track todo.id) {
      <app-todo
        [todo]="todo"
        [isProccessing]="isProcessing(todo.id)"
        (onUpdate)="update($event)"
        (onRemove)="remove($event)" />
    }
  `,
  styles: [],
})
export class AppComponent {
  readonly store = inject(TodoStore);

  todos = this.store.todos;

  update(todo: Todo): void {
    this.store.updateTodo(todo);
  }

  remove(id: number): void {
    this.store.removeTodo(id);
  }

  isProcessing(id: number) {
    return this.store.isProcessing()(id);
  }
}
