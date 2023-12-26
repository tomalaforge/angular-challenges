import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoStore } from './global-store';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  template: `
    @if (todoStore.state(); as state) {
      {{ todo.title }}
      <button
        (click)="todoStore.put(todo)"
        [disabled]="disabled || state === 'error'">
        Update
      </button>
      <button
        (click)="todoStore.delete(todo.id)"
        [disabled]="disabled || state === 'error'">
        Delete
      </button>
      @if (state === 'loading') {
        <mat-spinner [diameter]="15"></mat-spinner>
      } @else if (state === 'error') {
        <mat-icon fontIcon="error"></mat-icon>
      }
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 20px;
    }
    mat-spinner {
      display: inline-block;
    }
    mat-icon {
      transform: scale(0.8);
    }`,
  imports: [MatProgressSpinnerModule, MatIconModule],
  providers: [TodoStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() disabled!: boolean;

  @Output() update: EventEmitter<void> = new EventEmitter<void>();
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();

  protected todoStore = inject(TodoStore);
}
