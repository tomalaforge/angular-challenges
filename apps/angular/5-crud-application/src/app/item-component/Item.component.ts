import { Component, inject, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Todo } from '../core/models/todo.model';
import { App5StateService } from '../core/services/state/app-state.service';
import { TodosFacadeService } from '../core/services/todos/TodosFacade.service';

/**
 * Component representing a single Todo item.
 * It allows for updating and deleting the Todo item, with visual feedback during loading states.
 */
@Component({
  standalone: true,
  selector: 'app-item',
  template: `
    <div>
      {{ todo().title }}
      <button
        (click)="update(todo())"
        [disabled]="appState.isStatusLoadingWith(todo().id)">
        Update
      </button>
      <button
        (click)="delete(todo())"
        [disabled]="appState.isStatusLoadingWith(todo().id)">
        Delete
      </button>
      @if (appState.isStatusLoadingWith(todo().id)) {
        <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      }
    </div>
  `,
  imports: [MatProgressSpinner],
  styleUrls: [],
})
export class ItemComponent {
  todoService = inject(TodosFacadeService); // Injects the TodosFacadeService for CRUD operations on Todo items.
  appState = inject(App5StateService); // Injects the App5StateService for state management.
  todo = input.required<Todo>(); // The Todo item to be displayed and managed by this component.

  /**
   * Updates the title of the Todo item with random text.
   * @param todo The Todo item to update.
   */
  update(todo: Todo) {
    this.todoService.updateTodo({
      ...todo,
      title: randText(), // Generates and sets a new random title for the Todo item.
    });
  }

  /**
   * Deletes the specified Todo item.
   * @param todoToDelete The Todo item to delete.
   */
  delete(todoToDelete: Todo) {
    this.todoService.deleteTodo(todoToDelete);
  }
}
