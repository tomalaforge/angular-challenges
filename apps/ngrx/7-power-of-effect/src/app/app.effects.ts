import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { schoolActions } from './school/school.actions';
import { studentActions } from './student/store/student.actions';
import { teacherActions } from './teacher/store/teacher.actions';

const actionMap = new Map<string, string>();
actionMap.set(schoolActions.addOneSchool.type, 'School added');
actionMap.set(studentActions.addOneStudent.type, 'Student added');
actionMap.set(teacherActions.addOneTeacher.type, 'Teacher added');

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private snackbar = inject(MatSnackBar);

  displayAlerts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          schoolActions.addOneSchool,
          studentActions.addOneStudent,
          teacherActions.addOneTeacher,
        ),
        map((action) => {
          switch (action.type) {
            case schoolActions.addOneSchool.type:
              if (action.school.version === 0) {
                return `School added: ${action.school.name}`;
              } else {
                return `School updated: ${action.school.name}`;
              }
            case studentActions.addOneStudent.type:
              if (action.student.version === 0) {
                return `Student added: ${action.student.firstname} ${action.student.lastname}`;
              } else {
                return `Student updated: ${action.student.firstname} ${action.student.lastname}`;
              }
            default:
              if (action.teacher.version === 0) {
                return `Teacher added: ${action.teacher.firstname} ${action.teacher.lastname}`;
              } else {
                return `Teacher updated: ${action.teacher.firstname} ${action.teacher.lastname}`;
              }
          }
        }),
        tap((message) =>
          this.snackbar.open(message, 'close', {
            duration: 500,
          }),
        ),
      ),
    { dispatch: false },
  );
}
