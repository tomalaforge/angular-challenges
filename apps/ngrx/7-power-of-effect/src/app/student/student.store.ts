import { Student, isStudent } from '@angular-challenges/power-of-effect/model';
import { Injectable, inject } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, filter, pipe, switchMap, withLatestFrom } from 'rxjs';
import { PUSH_NOTIFICATION } from '../app.config';
import { HttpService } from '../data-access/http.service';
import { MessageService } from '../message.service';

@Injectable()
export class StudentStore
  extends ComponentStore<{ students: Student[] }>
  implements OnStoreInit
{
  readonly students$ = this.select((state) => state.students);
  readonly #studentNotification = inject<Observable<Student>>(
    PUSH_NOTIFICATION,
  ).pipe(
    filter(isStudent),
    withLatestFrom(this.students$),
    filter(
      ([newStudent, currentStudents]) =>
        currentStudents.filter((s) => s.id === newStudent.id).length === 0, //filter out already added student
    ),
  );
  readonly #httpService = inject(HttpService);
  readonly #messageService = inject(MessageService);

  constructor() {
    super({ students: [] });
  }

  addStudent = this.updater((state, student: Student) => ({
    ...state,
    students: [...state.students, student],
  }));

  updateStudent = this.updater((state, student: Student) => ({
    ...state,
    students: state.students.map((t) => (t.id === student.id ? student : t)),
  }));

  readonly #loadStudents = this.effect<void>(
    pipe(
      switchMap(() =>
        this.#httpService.getAllStudents().pipe(
          tapResponse(
            (students) => this.patchState({ students }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  readonly #onStudentNotification = this.effect<void>(
    pipe(
      switchMap(() =>
        this.#studentNotification.pipe(
          tapResponse(
            ([student]) => {
              this.addStudent(student);
              this.#messageService.showMessage(
                `A new student has been added ${student.firstname} - ${student.lastname}.`,
              );
            },
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.#loadStudents();
    this.#onStudentNotification();
  }
}
