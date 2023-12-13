import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoadingDirective } from '../../shared/loading/loading.directive';
import { Todo } from '../../shared/todo.interface';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe, LoadingDirective, LoadingComponent],
  providers: [ApiService],
  selector: 'app-todos',
  template: `
    <ng-container *ngIf="true; else loading">
      <div *ngFor="let todo of todos$ | async">
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
  #apiService = inject(ApiService);
  todos$ = this.#apiService.todos$;

  ngOnInit(): void {
    this.#apiService.getTodos();
  }

  delete(todo: Todo): void {
    this.#apiService.delete(todo);
  }

  update(todo: Todo): void {
    this.#apiService.update(todo);
  }
}
