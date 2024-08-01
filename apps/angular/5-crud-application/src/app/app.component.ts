import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoListComponent } from './component/todo-list.component';

@Component({
  standalone: true,
  imports: [TodoListComponent],
  selector: 'app-root',
  template: `
    <app-todo-list />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
