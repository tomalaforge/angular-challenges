/* eslint-disable @angular-eslint/component-selector */
import { Component, inject } from '@angular/core';
import { RxActionFactory } from '@rx-angular/state/actions';
import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from './todo.model';
import { TodosStateService } from './todos.state';

@Component({
  standalone: true,
  imports: [LetModule, ForModule, TodoItemComponent],
  providers: [TodosStateService, RxActionFactory],
  selector: 'todos',
  template: `
    <ng-container *rxLet="vm$ as vm">
      <todo-item
        *rxFor="let todo of vm.todos; trackBy: trackById"
        [todo]="todo"
        (delete)="todosState.delete($event)"
        (update)="todosState.update($event)">
      </todo-item>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class TodosComponent {
  readonly todosState = inject(TodosStateService);
  readonly vm$ = this.todosState.vm$;

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
