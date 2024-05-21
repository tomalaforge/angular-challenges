import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { appActions } from '../../app.actions';
import { HttpService } from '../../data-access/http.service';
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
}
