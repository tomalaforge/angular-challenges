import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoadingDirective } from '../../shared/loading/loading.directive';
import { Todo } from '../../shared/models/todo.interface';
import { ApiService } from '../../shared/services/api.service';
import { TodosStore } from './todos.store';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe, LoadingDirective, LoadingComponent],
  providers: [ApiService],
  selector: 'app-todos',
  template: `
    <ng-container *ngIf="!vm().loading; else loading">
      <div *ngFor="let todo of vm().todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    </ng-container>
    <ng-template #loading>
      <app-loading />
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  #store = inject(TodosStore);

  protected vm = this.#store.selectSignal((state) => state);

  ngOnInit(): void {
    this.#store.init();
  }

  delete(todo: Todo): void {
    this.#store.delete(todo);
  }

  update(todo: Todo): void {
    this.#store.update(todo);
  }
}
