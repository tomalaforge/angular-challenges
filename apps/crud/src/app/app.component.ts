import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$ = this.todoService.todo$;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodo();
  }
  update(todo: Todo) {
    this.todoService.update(todo);
  }
}
