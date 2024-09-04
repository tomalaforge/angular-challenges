import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Todo } from './Model/todo';
import { TodoService } from './Service/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: WritableSignal<Todo[]> = signal([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos$) => {
      this.todos.set(todos$);
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated$: Todo) => {
      const updatedTodos = this.todos().map((t) =>
        t.id === todoUpdated$.id ? todoUpdated$ : t,
      );
      this.todos.set(updatedTodos);
    });
  }
}
