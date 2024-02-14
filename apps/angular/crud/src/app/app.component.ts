import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITodo } from './models';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="updateTodo(todo)">Update</button>
        <button (click)="deleteTodo(todo)">Delete</button>
      </div>
    }
  `,
})
export class AppComponent implements OnInit {
  todos: WritableSignal<ITodo[]> = this.todoService.todos;

  constructor(
    private readonly todoService: TodoService,
    private readonly snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.todoService.getAll();
  }

  updateTodo(todo: ITodo): void {
    this.todoService.update(todo).subscribe((updatedTodo: ITodo) => {
      const updateArray = (arr: ITodo[], updatedTodo: ITodo) =>
        arr.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      this.todos.update((todos) => updateArray(todos, updatedTodo));
    });
  }

  deleteTodo(todo: ITodo): void {
    this.todoService.delete(todo).subscribe(
      () => {
        const updateArray = (arr: ITodo[], deletedTodo: ITodo) =>
          arr.filter((todo) => todo.id !== deletedTodo.id);
        this.todos.update((todos) => updateArray(todos, todo));
      },
      (error) =>
        this.snackbar.open('Error occured', undefined, { duration: 3000 }),
    );
  }
}
