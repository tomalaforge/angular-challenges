import { isStudent } from '@angular-challenges/power-of-effect/model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { appActions } from '../../app.actions';
import { HttpService } from '../../data-access/http.service';
import { PUSH_TOKEN } from '../../push-token';
import { studentActions } from './student.actions';

@Injectable()
export class StudentEffects {
  private actions$ = inject(Actions);
  private httpService = inject(HttpService);

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.initApp),
      switchMap(() =>
        this.httpService
          .getAllStudents()
          .pipe(map((students) => studentActions.addAllStudents({ students }))),
      ),
    ),
  );

  updateStudent$ = createEffect(() =>
    inject(PUSH_TOKEN).pipe(
      filter(Boolean),
      filter(isStudent),
      map((student) => studentActions.addOneStudent({ student })),
    ),
  );
}
