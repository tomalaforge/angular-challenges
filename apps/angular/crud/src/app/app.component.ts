import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Task } from './model/task';
import { taskActions } from './store/tasks/task.action';
import { getTaskListSelector } from './store/tasks/task.selector';
import { LoaderService } from './ui/loader/loader.service';
import { TaskComponent } from './ui/task/task.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="relative flex h-max justify-center">
      @if (loaderService.isLoading$()) {
        <div class="fixed z-10 w-full">
          <mat-progress-bar mode="indeterminate" value="40"></mat-progress-bar>
        </div>
        <!-- <div class="absolute w-full h-full z-10 bg-slate-600 opacity-70">
          <mat-spinner class="top-1/2 left-1/2 z-20"></mat-spinner>
        </div> -->
      }
      <div class="m-32">
        <div class="mb-5 text-center text-3xl">Angular CRUD Challenge</div>
        <div class="flex justify-between gap-5">
          <div class="w-30vw mb-5 text-center text-xl">Title</div>
          <div class="mb-5 text-center text-xl">Actions</div>
        </div>
        @for (todo of todos; track $index) {
          <app-task [task]="todo"></app-task>
          <hr />
        }
      </div>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    TaskComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private stodos = signal<Task[]>([]);
  private sysSubs: Subscription = new Subscription();

  public get todos(): Task[] {
    return this.stodos();
  }
  public loaderService = inject(LoaderService);
  private store = inject(Store);

  ngOnDestroy(): void {
    this.sysSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(taskActions.loadTasksAction());
    this.sysSubs.add(
      this.store.select(getTaskListSelector).subscribe({
        next: (res) => this.stodos.set(res),
        error: () => {
          this.stodos.set([]);
        },
      }),
    );
  }
}
