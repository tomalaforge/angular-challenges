import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TodoItemStore } from '../../todoItem.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Todo } from '../../interfaces/Todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  providers: [provideComponentStore(TodoItemStore)],
  templateUrl: './todo-item.component.html',
  styleUrls: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() set todo(todo: Todo) {
    this.todoItemStore.patchState({ todo: todo, callState: 'LOADED' });
    // occasionally the delete button didn't render in the html
    // as long as callState is not `Updating` or `Deleting` - it shouldn't matter
    // problem with my cached build file or another bug somewhere else?
    // deleted .angular folder multiple times - the app seems fine -> just noted in case
  }

  private todoItemStore = inject(TodoItemStore);

  vm$ = this.todoItemStore.vm$;

  update(todoId: any) {
    this.todoItemStore.update(todoId);
  }

  delete(todoId: any) {
    this.todoItemStore.deleteTodo(todoId);
  }
}
