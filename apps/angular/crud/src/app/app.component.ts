import { Component, inject } from '@angular/core';
import { TodoComponent } from './component/todo/todo.component';
import { TodoStore } from './component/todo/todo.store';
import { LoaderComponent } from './ui/loader/loader.component';

@Component({
  standalone: true,
  imports: [TodoComponent, LoaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  todoStore = inject(TodoStore);
}
