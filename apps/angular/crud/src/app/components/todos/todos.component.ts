import { Component, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../../interfaces/todo.interface';
import { TodoStore } from '../../store/todo/todo-store';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  todoStore = inject(TodoStore);

  update(todo: Todo) {
    todo = { ...todo, title: randText() };
    this.todoStore.update.mutate({
      payload: todo,
    });
  }

  delete(id: number) {
    this.todoStore.delete.mutate({ payload: id });
  }
}
