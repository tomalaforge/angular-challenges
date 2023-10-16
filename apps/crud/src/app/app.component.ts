import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Todo } from './todo.model';
import { TodoStore } from './todo-store';
import { LetDirective } from '@ngrx/component';

@Component({
  standalone: true,
  imports: [CommonModule, LetDirective, NgIf],
  selector: 'app-root',
  template: `
    <!-- <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div> -->

    <ng-container *ngrxLet="vm$ as vm">
      <div *ngIf="vm.loadingAllTodos">loading</div>

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
