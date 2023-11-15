import { Component } from '@angular/core';
import { ToDoComponent } from './components/to-do/to-do.component';

@Component({
  standalone: true,
  imports: [ToDoComponent],
  selector: 'app-root',
  template: `
    <div class="relative">
      <app-to-do> </app-to-do>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
