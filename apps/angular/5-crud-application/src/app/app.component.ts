import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TodoItemComponent } from './Components/todo-item.component';
import { Todo } from './Model/todo';
import { TodosStore } from './Store/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @for (todo of store.todos(); track todo.id) {
      <app-todo-item
        [todo]="todo"
        (onUpdate)="update($event)"
        (onDelete)="delete($event)"></app-todo-item>
    } @empty {
      <span>Loading...</span>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  readonly store = inject(TodosStore);

  ngOnInit(): void {
    this.store.getTodos();
  }

  update(todo: Todo) {
    this.store.updateTodo(todo);
  }

  delete(todo: Todo) {
    this.store.deleteTodo(todo);
  }
}
