import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { StateService, Todo } from './state/state.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <mat-spinner />
    } @else {
      <div *ngFor="let todo of todos()">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly stateService = inject(StateService);

  todos = this.stateService.todos;
  isLoading = this.stateService.isLoading;

  ngOnInit(): void {
    this.stateService.fetchData();
  }

  update(todo: Todo) {
    this.stateService.update(todo);
  }

  delete(todo: Todo) {
    this.stateService.delete(todo);
  }
}
