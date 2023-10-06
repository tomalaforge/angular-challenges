import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoConfig } from './core/Interface/todo';
import { GetToDoService } from './services/getTodo.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let todo of todos | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Observable<TodoConfig[]>;

  constructor(private getTodoService: GetToDoService) {}

  ngOnInit(): void {
    this.todos = this.getTodoService.getTodoData();
  }

  update(todo: TodoConfig) {
    this.todos = this.getTodoService.updateTodo(todo);
  }
}
