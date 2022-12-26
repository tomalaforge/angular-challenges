/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, OnInit } from '@angular/core';
import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from './todo.model';
import { TodosStateService } from './todos.state';

@Component({
  standalone: true,
  imports: [LetModule, ForModule, TodoItemComponent],
  providers: [TodosStateService],
  selector: 'todos',
  template: `
    <ng-container *rxLet="vm$ as vm">
      <todo-item
        *rxFor="let todo of vm.todos; trackBy: trackById"
        [todo]="todo">
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
export class TodosComponent implements OnInit {
  private todosState = inject(TodosStateService);
  vm$ = this.todosState.vm$;

  ngOnInit(): void {
    this.todosState.init();
  }

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
