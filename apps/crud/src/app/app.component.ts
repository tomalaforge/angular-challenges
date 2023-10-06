import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from './app.store';
import { provideComponentStore } from '@ngrx/component-store';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

// can render vm without ngrxLet
// is ngrxLet really necessary?
// Todos are not gonna be zero / have to delete 200 todos to get to zero

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, TodoItemComponent, LoadingSpinnerComponent],
  providers: [provideComponentStore(AppStore)],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div *ngIf="vm.callState.toLowerCase() === 'loading'">
        <app-loading-spinner></app-loading-spinner>
      </div>
      <app-todo-item
        *ngFor="let todo of vm.todos"
        [todo]="todo"></app-todo-item>
    </ng-container>
  `,
  styles: [],
})
export class AppComponent {
  private appStore = inject(AppStore);

  vm$ = this.appStore.vm$;
}
