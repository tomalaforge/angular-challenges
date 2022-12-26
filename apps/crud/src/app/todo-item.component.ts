/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxState } from '@rx-angular/state';
import { IfModule } from '@rx-angular/template/if';
import { LetModule } from '@rx-angular/template/let';
import { merge } from 'rxjs';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [IfModule, LetModule, MatProgressSpinnerModule],
  template: `
    <ng-container *rxLet="vm$ as vm">
      <mat-spinner *rxIf="vm.loading" [diameter]="20"></mat-spinner>
      {{ vm.todo.title }}
      <button (click)="update.emit(vm.todo.id)">Update</button>
      <button (click)="delete.emit(vm.todo.id)">Delete</button>
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
export class TodoItemComponent extends RxState<{
  loading: boolean;
  todo: Todo;
}> {
  @Input() set todo(todo: Todo) {
    this.set({ todo, loading: false });
  }

  @Output() readonly update = new EventEmitter<number>();
  @Output() readonly delete = new EventEmitter<number>();

  vm$ = this.select();

  constructor() {
    super();
    this.connect('loading', merge(this.update, this.delete), () => true);
  }
}
