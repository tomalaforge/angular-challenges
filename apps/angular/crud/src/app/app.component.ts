import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { TodoHttpService } from '../http/todo-http.service';
import { TodoItem } from '../models/todo';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div *ngIf="isProcessing" class="indicator">
      <mat-spinner></mat-spinner>
    </div>
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo, $index)">Update</button>
        <button (click)="delete(todo.id, $index)">Delete</button>
      </div>
    }
  `,
  styles: [
    `
      .indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: rgba(100, 100, 100, 0.5);
      }
    `,
  ],
  host: {
    styles: 'position: relative',
  },
})
export class AppComponent implements OnInit {
  todos = signal<TodoItem[]>([]);
  isProcessing = false;

  constructor(private todoHttpService: TodoHttpService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.isProcessing = true;
    this.todoHttpService.getTodoList().subscribe((todos) => {
      this.isProcessing = false;
      this.todos.set(todos);
    });
  }

  update(todo: TodoItem, index: number) {
    this.isProcessing = true;

    const body = {
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    };

    this.todoHttpService
      .updateTodoItem(todo.id, body)
      .subscribe((todoUpdated: TodoItem) => {
        this.isProcessing = false;
        this.todos.update((value: TodoItem[]) => {
          value.splice(index, 1, todoUpdated);
          return value;
        });
      });
  }

  delete(id: number, index: number) {
    this.isProcessing = true;
    this.todoHttpService.deleteTodoItem(id).subscribe(() => {
      this.isProcessing = false;
      this.todos.update((value: TodoItem[]) => {
        value.splice(index, 1);
        return value;
      });
    });
  }
}
