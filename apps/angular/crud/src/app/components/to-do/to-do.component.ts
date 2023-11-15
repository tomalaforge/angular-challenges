import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ToDoStore } from './store/to-do.store';
import { ListComponent } from '../../shared/components/list/list.component';
import { ToDoItem } from './store/model/to-do.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { randText } from '@ngneat/falso';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    NgIf,
    ListComponent,
    MatButtonModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="flex-center flex-col list-wrapper">
      <h1 class="text-center">To Do List</h1>
      <app-list [list]="store.todo()">
        <ng-template let-item="item" #listItem>
          <div class="list-items flex-between">
            <div>
              {{ item?.title }}
            </div>
            <div>
              <button
                class="update"
                [disabled]="store.isLoading()"
                mat-button
                (click)="update(item)">
                Update
              </button>
              <button
                class="delete"
                [disabled]="store.isLoading()"
                mat-button
                color="warn"
                (click)="delete(item.id)">
                Delete
              </button>
            </div>
          </div>
        </ng-template>
      </app-list>
    </div>
    <div *ngIf="store.isLoading()" class="flex-center spinner">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [
    `
      .text-center {
        text-align: center;
      }
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .flex-col {
        flex-direction: column;
      }
      .flex-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .list-wrapper {
        padding: 20px 0px;
      }
      .list-items {
      }
      .spinner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToDoStore],
})
export class ToDoComponent implements OnInit {
  readonly store = inject(ToDoStore);

  ngOnInit(): void {
    this.store.setTodo();
  }

  delete(id: number) {
    this.store.deleteTodo(id);
  }

  update(todo: ToDoItem) {
    todo = { ...todo, title: randText() };
    this.store.updateTodo(todo);
  }
}
