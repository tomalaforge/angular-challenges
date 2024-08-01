import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoStore } from '../data-access/todo.store';
import { Todo } from '../model/todo.model';
import { TodoListItemComponent } from '../ui/todo-list-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, MatProgressSpinnerModule],
  providers: [TodoStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  todoStore = inject(TodoStore);

  updateTodo(todo: Todo) {
    this.todoStore.updateOne(todo);
  }

  deleteTodo(id: number) {
    this.todoStore.deleteOne(id);
  }
}
