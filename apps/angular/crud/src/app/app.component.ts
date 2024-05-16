import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Todo } from './models/todo.model';
import { TodosStore } from './stores/todo.store';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-spinner
      [diameter]="20"
      color="blue"
      *ngIf="todoStore.isLoading()"></mat-spinner>
    <ng-container *ngIf="todoStore.error() as error">
      Error has occured: {{ error }}
    </ng-container>
    <div class="container">
      <div *ngFor="let todo of todoStore.todos()">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-wrap: wrap;
        div {
          margin-right: 2rem;
          width: 10rem;
        }
      }
    `,
  ],
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  readonly todoStore = inject(TodosStore);

  constructor() {}

  ngOnInit(): void {
    this.todoStore.load();
  }

  update(todo: Todo) {
    this.todoStore.update({
      ...todo,
      title: randText(),
    });
  }
}
