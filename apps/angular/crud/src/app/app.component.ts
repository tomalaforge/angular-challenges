import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosStore } from './global-store';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoComponent],
  selector: 'app-root',
  styles: `:host {
    --mdc-circular-progress-active-indicator-color: grey;
    --mat-icon-color: red;
    dialog {
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }`,
  template: `
    @if (store.state(); as state) {
      @if (state === 'loading') {
        <mat-spinner [diameter]="15"></mat-spinner>
      } @else if (state === 'error') {
        <dialog open>
          API Error
          <button (click)="store.resetState()">reset</button>
        </dialog>
      } @else {
        @for (todo of store.entities(); track todo.id) {
          <app-todo [todo]="todo" [disabled]="store.disabled()" />
        }
      }
    }
  `,
})
export class AppComponent {
  protected store = inject(TodosStore);
  protected todoService = inject(TodoService);
  constructor() {
    this.store.loadAll();
  }
}
