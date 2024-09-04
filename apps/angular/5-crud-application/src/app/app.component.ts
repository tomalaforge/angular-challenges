import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Todo } from './Model/todo';
import { TodoService } from './Service/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="deleteTodo(todo)">Delete</button>
      </div>
    } @empty {
      <span>Loading...</span>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: WritableSignal<Todo[]> = signal([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: (todos$) => {
        this.todos.set(todos$);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: (todoUpdated$: Todo) => {
        const updatedTodos = this.todos().map((t) =>
          t.id === todoUpdated$.id ? todoUpdated$ : t,
        );
        this.todos.set(updatedTodos);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe({
      next: () => {
        const updatedTodos = this.todos().filter((t) => t.id !== todo.id);
        this.todos.set(updatedTodos);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
