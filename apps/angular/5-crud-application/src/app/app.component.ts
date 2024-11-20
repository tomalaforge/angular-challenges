import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ItemComponent } from './item/item.component';
import { StateService, Todo } from './state/state.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, ItemComponent],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <mat-spinner />
    } @else {
      <div *ngFor="let todo of todos()">
        <app-item
          [todo]="todo"
          (update)="update(todo)"
          (delete)="delete(todo)"></app-item>
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
