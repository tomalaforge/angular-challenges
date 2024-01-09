import {
  Student,
  isStudent,
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
export class studentStore
  extends ComponentStore<{ students: Student[] }>
  implements OnStoreInit, OnStateInit
{
  readonly students$ = this.select((state) => state.students);

  constructor(
    private httpService: HttpService,
    private store: Store,
  ) {
    super({ students: [] });
  }

  addStudent = this.updater(
    (state, student: Student): { students: Student[] } => ({
      ...state,
      students: [...state.students, student],
    }),
  );

  updateStudent = this.updater(
    (state, student: Student): { students: Student[] } => ({
      ...state,
      students: state.students.map((t) => (t.id === student.id ? student : t)),
    }),
  );

  private readonly loadStudents = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllStudents().pipe(
          tapResponse(
            (students) => this.patchState({ students }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.loadStudents();
  }

  private notification$ = inject(TOKEN);

  ngrxOnStateInit() {
    this.addStudents();
  }

  // this adds students to the list
  // injected the global store to dispatch action for the snackbar alert
  private readonly addStudents = this.effect<void>(
    pipe(
      switchMap(() =>
        this.notification$.pipe(
          tapResponse(
            (data) => {
              if (data && isStudent(data)) {
                this.addStudent(data);
                this.store.dispatch(
                  appActions.showAlert({
                    message: 'Add 1 student',
                    component: 'student',
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
