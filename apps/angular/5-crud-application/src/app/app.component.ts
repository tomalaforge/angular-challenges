import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ItemComponent } from './item/item.component';
import { Todo } from './state/todo.model';
import { TodosStore } from './state/todos.store';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, ItemComponent],
  providers: [TodosStore],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <mat-spinner />
    } @else {
      <div *ngFor="let todo of todos()">
        <app-item
          [todo]="todo"
          (update)="update(todo)"
          (delete)="delete(todo.id)"></app-item>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly todoStore = inject(TodosStore);

  todos = this.todoStore.todos;
  isLoading = this.todoStore.isLoading;

  ngOnInit(): void {
    this.todoStore.fetchData();
  }

  update(todo: Todo) {
    this.todoStore.update(todo);
  }

  delete(id: number) {
    this.todoStore.delete(id);
  }
}
