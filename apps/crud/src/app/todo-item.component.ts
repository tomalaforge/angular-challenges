/* eslint-disable @angular-eslint/component-selector */
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetModule } from '@rx-angular/template/let';
import { TodoItemStateService } from './todo-item.state';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [NgIf, LetModule, MatProgressSpinnerModule],
  providers: [TodoItemStateService],
  template: `
    <ng-container *rxLet="vm$ as vm">
      <mat-spinner *ngIf="vm.loading" [diameter]="20"></mat-spinner>
      {{ vm.todo.title }}
      <button (click)="update(vm.todo.id)">Update</button>
      <button (click)="delete(vm.todo.id)">Delete</button>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  private todoItemState = inject(TodoItemStateService);

  @Input() set todo(todo: Todo) {
    this.todoItemState.set({ todo, loading: false });
  }

  vm$ = this.todoItemState.vm$;

  update(id: number) {
    this.todoItemState.update(id);
  }

  delete(id: number) {
    this.todoItemState.delete(id);
  }
}
