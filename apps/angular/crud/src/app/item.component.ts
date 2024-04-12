import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Todo, TodosApiService } from './todos-api.service';

@Component({
  standalone: true,
  selector: 'app-item',
  template: `
    <div>
      @if (update.isError() || delete.isError()) {
        <span>An error occur!</span>
      } @else {
        <span>{{ todo().title }}</span>
      }

      <button (click)="update.mutate(todo())">
        @if (update.isPending()) {
          <span>Updating...</span>
        } @else {
          <span>Update</span>
        }
      </button>
      <button (click)="delete.mutate(todo().id)">
        @if (delete.isPending()) {
          <span>Deleting...</span>
        } @else {
          <span>Delete</span>
        }
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  todo = input.required<Todo>();

  #api = inject(TodosApiService);

  update = injectMutation((client) => ({
    mutationFn: (todo: Todo) => lastValueFrom(this.#api.updateTodo$(todo)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  delete = injectMutation((client) => ({
    mutationFn: (todoId: number) =>
      lastValueFrom(this.#api.deleteTodo$(todoId)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    },
  }));
}
