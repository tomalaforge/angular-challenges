import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [MatProgressSpinnerModule, AsyncPipe],
  template: `
    <div [class.processing]="isProcessing">
      {{ todo.title }}
      <br />
      @if (isProcessing) {
        <mat-spinner diameter="20"></mat-spinner>
      }
      @if (error) {
        <div style="color: red;">{{ error }}</div>
      }
      <button (click)="onUpdate()">Update</button>
      <button (click)="delete.emit(this.todo)">Delete</button>
    </div>
  `,
  styles: ['.processing {opacity: 0.6; pointer-events: none;}'],
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: todo;
  @Input() isProcessing: boolean = false;
  @Input() error: string | null = null;

  @Output() update = new EventEmitter<todo>();
  @Output() delete = new EventEmitter<todo>();

  onUpdate() {
    this.update.emit(this.todo);
  }
}
