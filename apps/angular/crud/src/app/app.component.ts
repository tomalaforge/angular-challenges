import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
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
      </div>
    }
  `,
})
export class AppComponent implements OnInit {
  todos: WritableSignal<ITodo[]> = this.todoService.todos;

  constructor(private readonly todoService: TodoService) {}

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
}
