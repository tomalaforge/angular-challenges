import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

@Component({
  imports: [CommonModule, TodoListComponent],
  selector: 'app-root',
  template: `
    <app-todo-list />
  `,
  styles: [],
})
export class AppComponent {}
