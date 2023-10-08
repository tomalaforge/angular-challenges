import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppStore } from './app.store';
import { provideComponentStore } from '@ngrx/component-store';
//import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// originally used loading spinner component from loading.io - swapped for mat spinner
// can freely swap them

// can render vm without ngrxLet
// is ngrxLet really necessary?
// Todos are not gonna be zero / have to delete 200 todos to get to zero

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, TodoItemComponent, MatProgressSpinnerModule],
  providers: [provideComponentStore(AppStore)],
  selector: 'app-root',
  //changeDetection: ChangeDetectionStrategy.OnPush not necessary? - better to add trackBy for performance?
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div *ngIf="vm.callState.toLowerCase() === 'loading'">
        <mat-spinner></mat-spinner>
      </div>
      <app-todo-item *ngFor="let todo of vm.todos" [todo]="todo"></app-todo-item
      ><!--trackBy: trackByTodo-->
    </ng-container>
  `,
  styles: [],
})
export class AppComponent {
  private appStore = inject(AppStore);

  vm$ = this.appStore.vm$;

  /*
  trackByTodo(index:number, todo:Todo) {
    return todo ? todo.id : undefined;
  }
  */
}
