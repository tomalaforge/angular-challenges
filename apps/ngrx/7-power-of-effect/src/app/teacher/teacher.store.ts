import { Teacher, isTeacher } from '@angular-challenges/power-of-effect/model';
import { Injectable, inject } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, filter, pipe, switchMap, withLatestFrom } from 'rxjs';
import { PUSH_NOTIFICATION } from '../app.config';
import { HttpService } from '../data-access/http.service';
import { MessageService } from '../message.service';

@Injectable()
export class TeacherStore
  extends ComponentStore<{ teachers: Teacher[] }>
  implements OnStoreInit
{
  readonly teachers$ = this.select((state) => state.teachers);
  readonly #teacherNotification = inject<Observable<Teacher>>(
    PUSH_NOTIFICATION,
  ).pipe(
    filter(isTeacher),
    withLatestFrom(this.teachers$),
    filter(
      ([newTeacher, currentTeachers]) =>
        currentTeachers.filter((s) => s.id === newTeacher.id).length === 0, //filter out already added teacher
    ),
  );
  readonly #httpService = inject(HttpService);
  readonly #messageService = inject(MessageService);

  constructor() {
    super({ teachers: [] });
  }

  addTeacher = this.updater((state, teacher: Teacher) => ({
    ...state,
    teachers: [...state.teachers, teacher],
  }));

  updateTeacher = this.updater((state, teacher: Teacher) => ({
    ...state,
    teachers: state.teachers.map((t) => (t.id === teacher.id ? teacher : t)),
  }));

  readonly #loadTeachers = this.effect<void>(
    pipe(
      switchMap(() =>
        this.#httpService.getAllTeachers().pipe(
          tapResponse(
            (teachers) => this.patchState({ teachers }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  readonly #onTeacherNotification = this.effect<void>(
    pipe(
      switchMap(() =>
        this.#teacherNotification.pipe(
          tapResponse(
            ([teacher]) => {
              this.addTeacher(teacher);
              this.#messageService.showMessage(
                `A new teacher has been added ${teacher.firstname} - ${teacher.lastname}.`,
              );
            },
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.#loadTeachers();
    this.#onTeacherNotification();
  }
}
