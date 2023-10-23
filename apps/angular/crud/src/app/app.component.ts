import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ITodo } from './models/todo.model';
import { TodoService } from './data-access/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
  <ng-container *ngIf="this.todoService.todos$ | async as todos">
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="this.todoService.update(todo)">Update</button>
    </div>
  </ng-container>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: ITodo[] = [];
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.get()
  }


}
