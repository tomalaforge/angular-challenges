import {
  Teacher,
  isTeacher,
} from '@angular-challenges/ngrx-notification/model';
import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { pipe, switchMap } from 'rxjs';
import { appActions } from '../app.actions';
import { HttpService } from '../data-access/http.service';
import { TOKEN } from '../token';

@Injectable()
export class TeacherStore
  extends ComponentStore<{ teachers: Teacher[] }>
  implements OnStoreInit, OnStateInit
{
  readonly teachers$ = this.select((state) => state.teachers);

  constructor(
    private httpService: HttpService,
    private store: Store,
  ) {
    super({ teachers: [] });
  }

  addTeacher = this.updater(
    (state, teacher: Teacher): { teachers: Teacher[] } => ({
      ...state,
      teachers: [...state.teachers, teacher],
    }),
  );

  updateTeacher = this.updater(
    (state, teacher: Teacher): { teachers: Teacher[] } => ({
      ...state,
      teachers: state.teachers.map((t) => (t.id === teacher.id ? teacher : t)),
    }),
  );

  private readonly loadTeachers = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllTeachers().pipe(
          tapResponse(
            (teachers) => this.patchState({ teachers }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.loadTeachers();
  }

  private notification$ = inject(TOKEN);

  ngrxOnStateInit() {
    this.addTeachers();
  }

  // this adds teachers to the list
  // injected the global store to dispatch action for the snackbar alert
  private readonly addTeachers = this.effect<void>(
    pipe(
      switchMap(() =>
        this.notification$.pipe(
          tapResponse(
            (data) => {
              if (data && isTeacher(data)) {
                this.addTeacher(data);
                this.store.dispatch(
                  appActions.showAlert({
                    message: 'Add 1 teacher',
                    component: 'Teacher',
                  }),
                );
              }
            },
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );
}
