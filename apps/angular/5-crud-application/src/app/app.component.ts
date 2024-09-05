import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './Model/todo';
import { TodosStore } from './Store/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of store.todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
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
