import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodosComponent } from './components/todos/todos.component';


@Component({
  standalone: true,
  imports: [CommonModule, TodosComponent],

  selector: 'app-root',
  template: `
    <app-todos></app-todos>
   `,

})
export class AppComponent {

}
