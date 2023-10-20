import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from './todo-store';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemComponent } from './todo-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, LetDirective, NgIf, NgFor, TodoItemComponent],
  selector: 'app-root',
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <div *ngIf="vm.loadingAllTodos">loading</div>

      <ng-container *ngIf="vm.error; else noerror">
        Something went wrong!
      </ng-container>

      <ng-template #noerror>
        <app-todo-item
          *ngFor="let todo of vm.todos"
          [todo]="todo"></app-todo-item>
      </ng-template>
    </ng-container>
  `,
  styles: [],
  providers: [provideComponentStore(TodoStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todoStore = inject(TodoStore);

  vm$ = this.todoStore.vm$;
}
