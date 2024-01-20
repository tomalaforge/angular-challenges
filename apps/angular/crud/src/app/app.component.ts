import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TodoStore2 } from './data-access/todosignals.store';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <app-spinner></app-spinner>
    @for (todo of todoStore2.todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button
          [disabled]="todoStore2.isDeleting() || todoStore2.isUpdating()"
          (click)="update(todo)">
          Update
        </button>
        <button
          [disabled]="todoStore2.isDeleting() || todoStore2.isUpdating()"
          (click)="delete(todo)">
          Delete
        </button>
        <span>{{ todo.status }}</span>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'Crud Example';
  readonly todoStore2 = inject(TodoStore2);

  ngOnInit(): void {
    this.todoStore2.loadByQuery();
  }

  update(todo: Todo) {
    this.todoStore2.update(todo);
  }
  delete(todo: Todo) {
    this.todoStore2.delete(todo);
  }
}
