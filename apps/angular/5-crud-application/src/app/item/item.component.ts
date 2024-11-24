import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { Todo } from '../state/todo.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  constructor() {
    effect(() => {
      this.isUpdating = false;
    });
  }

  todo = input.required<Todo>();
  update = output<void>();
  delete = output<void>();
  isUpdating = false;

  onAction(action: 'update' | 'delete'): void {
    this.isUpdating = true;
    this[action].emit();
  }
}
