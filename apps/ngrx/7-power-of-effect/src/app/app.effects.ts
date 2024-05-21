import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { appApiActions } from './app.actions';
import { schoolActions } from './school/school.actions';
import { studentActions } from './student/store/student.actions';
import { teacherActions } from './teacher/store/teacher.actions';

export const schoolUpserted = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(schoolActions.addOneSchool),
      map((action) => {
        if (action.school.version === 0) {
          return `School added: ${action.school.name}`;
        } else {
          return `School updated: ${action.school.name}`;
        }
      }),
      map((message) => appApiActions.alert({ message })),
    ),
  { functional: true },
);

export const studentUpserted = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(studentActions.addOneStudent),
      map((action) => {
        if (action.student.version === 0) {
          return `Student added: ${action.student.firstname} ${action.student.lastname}`;
        } else {
          return `Student updated: ${action.student.firstname} ${action.student.lastname}`;
        }
      }),
      map((message) => appApiActions.alert({ message })),
    ),
  { functional: true },
);

export const teacherUpserted = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(teacherActions.addOneTeacher),
      map((action) => {
        if (action.teacher.version === 0) {
          return `Teacher added: ${action.teacher.firstname} ${action.teacher.lastname}`;
        } else {
          return `Teacher updated: ${action.teacher.firstname} ${action.teacher.lastname}`;
        }
      }),
      map((message) => appApiActions.alert({ message })),
    ),
  { functional: true },
);

export const displayAlerts = createEffect(
  (actions$ = inject(Actions), snackbar = inject(MatSnackBar)) =>
    actions$.pipe(
      ofType(appApiActions.alert),
      tap(({ message }) =>
        snackbar.open(message, 'close', {
          duration: 500,
        }),
      ),
    ),
  { functional: true, dispatch: false },
);
