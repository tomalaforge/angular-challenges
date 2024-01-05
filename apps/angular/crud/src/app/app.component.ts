import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodosComponent } from './containers/todos/todos.component';
import { Store } from './store';

@Component({
  standalone: true,
  imports: [CommonModule, TodosComponent],
  providers: [Store],
  selector: 'app-root',
  template: `
    <app-todos></app-todos>
  `,
  styles: [],
})
export class AppComponent {}
