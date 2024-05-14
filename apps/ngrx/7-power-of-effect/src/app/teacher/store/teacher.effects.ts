import { isTeacher } from '@angular-challenges/power-of-effect/model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { appActions } from '../../app.actions';
import { HttpService } from '../../data-access/http.service';
import { PUSH_TOKEN } from '../../push-token';
import { teacherActions } from './teacher.actions';

@Injectable()
export class TeacherEffects {
  private actions$ = inject(Actions);
  private httpService = inject(HttpService);

  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.initApp),
      switchMap(() =>
        this.httpService
          .getAllTeachers()
          .pipe(map((teachers) => teacherActions.addAllTeachers({ teachers }))),
      ),
    ),
  );

  updateTeacher$ = createEffect(() =>
    inject(PUSH_TOKEN).pipe(
      filter(Boolean),
      filter(isTeacher),
      map((teacher) => teacherActions.addOneTeacher({ teacher })),
    ),
  );
}
