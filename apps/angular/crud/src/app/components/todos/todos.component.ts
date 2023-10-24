import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService } from '../../data-access/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos',
  template: `
  <ng-container *ngIf="this.todoService.todos$ | async as todos">
    <div class="single-todo" *ngFor="let todo of todos">
      <span> {{ todo.title }} </span>
      <span class="actions">
        <button (click)="this.todoService.update(todo)">Update</button>
        <button (click)="this.todoService.delete(todo)">Delete</button>
      </span>
    </div>
  </ng-container>
  `,
  styles: [
    `
    .single-todo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px;
        paddiing: 5px;
      }

      .actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions button {
        margin: 5px;
        padding: 5px 10px;
      }
    `
  ],
})

export class TodosComponent  {
  todoService = inject(TodoService);


}