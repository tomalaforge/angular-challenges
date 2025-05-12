import { Component } from '@angular/core';
import { TodosComponent } from './containers/todos.component';

@Component({
  imports: [TodosComponent],
  selector: 'app-root',
  template: `
    <app-todos></app-todos>
  `,
})
export class AppComponent {}
