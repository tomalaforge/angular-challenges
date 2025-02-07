import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoListComponent } from './features/todo-list/todo-list.component';

@Component({
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, TodoListComponent],
  selector: 'app-root',
  template: `
    <mat-toolbar class="toolbar" />
    <app-todo-list />
  `,
  styles: [
    `
      .main-card {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent {}
