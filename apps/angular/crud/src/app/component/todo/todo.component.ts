import { Component, inject } from '@angular/core';
import { ListItemTemplateDirective } from '../../shared/directive/list-item-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { LoaderComponent } from '../../ui/loader/loader.component';
import { Todo } from './todo.interface';
import { TodoStore } from './todo.store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [ListItemComponent, LoaderComponent, ListItemTemplateDirective],
})
export class TodoComponent {
  todoStore = inject(TodoStore);

  update(todo: Todo) {
    this.todoStore.update(todo);
  }

  delete(todo: Todo) {
    this.todoStore.delete(todo);
  }
}
