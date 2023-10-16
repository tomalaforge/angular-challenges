import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Todo } from './todo.model';
import { TodoStore } from './todo-store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <!-- <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div> -->

    <ng-container *ngrxLet="vm$ as vm">
      <div *ngIf="vm.loading">loading</div>

      <ng-container *ngIf="vm.error; else noerror">
        Something went wrong!
      </ng-container>

      <ng-template #noerror> data </ng-template>
    </ng-container>
  `,
  styles: [],
})
export class AppComponent {
  todos!: Todo[];

  todoStore = inject(TodoStore);

  vm$ = this.todoStore.vm$;

  update(todo: Todo) {
    return todo;
  }
}
