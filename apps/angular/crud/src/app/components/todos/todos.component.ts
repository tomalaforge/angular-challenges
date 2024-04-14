import { Component, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../../interfaces/todo.interface';
import { OperationType } from '../../store/enums/actions.enum';
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
    this.todoStore.mutation.mutate({
      type: OperationType.UPDATE,
      payload: todo,
    });
  }

  delete(id: number) {
    this.todoStore.mutation.mutate({ type: OperationType.DELETE, payload: id });
  }
}
