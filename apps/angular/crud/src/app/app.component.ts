import { Component } from '@angular/core';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  standalone: true,
  imports: [TodosComponent],
  selector: 'app-root',
  template: `
    <div>
      <app-todos />
    </div>
  `,
  styles: [],
})
export class AppComponent {}
