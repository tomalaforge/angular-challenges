import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemComponent } from './components/todo-item.component';
import { TodoListStore } from './store/todo-list/todo-list.store';

@Component({
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  providers: [provideComponentStore(TodoListStore)],
  selector: 'app-root',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      @if (vm.status === 'loading') {
        <span>Is loading....</span>
      }
      @for (todo of vm.data; track todo?.id) {
        <todo-item [todo]="todo!"></todo-item>
      }
    </ng-container>
  `,
  styles: [],
})
export class AppComponent {
  private store = inject(TodoListStore);

  vm$ = this.store.vm$;
}
