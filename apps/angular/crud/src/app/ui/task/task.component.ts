import { Component, Input, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Store } from '@ngrx/store';
import { Task } from '../../model/task';
import { taskActions } from '../../store/tasks/task.action';
import { LoaderService } from '../loader/loader.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-task',
  template: `
    <div class="flex items-center justify-between gap-5 p-2 hover:bg-slate-200">
      <div class="w-30vw align-middle">
        {{ task.title }}
      </div>
      <div class="flex gap-3">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full hover:shadow-lg {{
            loaderService.isLoading$() ? 'opacity-50 cursor-not-allowed' : ''
          }}"
          (click)="updateTask(task)"
          [disabled]="loaderService.isLoading$()">
          Update
        </button>
        <button
          class="bg-pink-500 hover:bg-pink-700 text-white  py-2 px-4 rounded-full hover:shadow-lg {{
            loaderService.isLoading$() ? 'opacity-50 cursor-not-allowed' : ''
          }}"
          (click)="deleteTask(task)"
          [disabled]="loaderService.isLoading$()">
          Delete
        </button>
      </div>
    </div>
  `,
})
export class TaskComponent {
  @Input() task!: Task;
  private store = inject(Store);
  public loaderService = inject(LoaderService);

  updateTask(taskUpd: Task) {
    const newTaskUpd = { ...taskUpd };
    newTaskUpd.title = randText();
    this.store.dispatch(taskActions.updTaskAction({ task: newTaskUpd }));
  }

  deleteTask(taskUpd: Task) {
    this.store.dispatch(taskActions.delTaskAction({ task: taskUpd }));
  }
}
