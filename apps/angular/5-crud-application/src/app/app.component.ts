import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './Model/todo';
import { TodoService } from './Service/todo.service';
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
  // todos: WritableSignal<Todo[]> = signal([]);
  readonly store = inject(TodosStore);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // this.todoService.getTodos().subscribe({
    //   next: (todos$) => {
    //     this.todos.set(todos$);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // });
    this.store.getTodos();
  }

  update(todo: Todo) {
    // this.todoService.updateTodo(todo).subscribe({
    //   next: (todoUpdated$: Todo) => {
    //     const updatedTodos = this.todos().map((t) =>
    //       t.id === todoUpdated$.id ? todoUpdated$ : t,
    //     );
    //     this.todos.set(updatedTodos);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // });
    this.store.updateTodo(todo);
  }

  delete(todo: Todo) {
    // this.todoService.deleteTodo(todo).subscribe({
    //   next: () => {
    //     const updatedTodos = this.todos().filter((t) => t.id !== todo.id);
    //     this.todos.set(updatedTodos);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // });
    this.store.deleteTodo(todo);
  }
}
