import {
  School,
  Student,
  Teacher,
} from '@angular-challenges/ngrx-notification/model';
import { Injectable } from '@angular/core';
import { randNumber } from '@ngneat/falso';
import { ComponentStore } from '@ngrx/component-store';

interface AppState {
  teachers: Teacher[];
  students: Student[];
  schools: School[];
}

@Injectable({ providedIn: 'root' })
export class FakeDBService extends ComponentStore<AppState> {
  readonly teachers$ = this.select((state) => state.teachers);
  readonly randomTeacher$ = this.select(
    this.teachers$,
    (teachers) => teachers[randNumber({ max: teachers.length - 1 })],
  );

  readonly students$ = this.select((state) => state.students);
  readonly randomStudents$ = this.select(
    this.students$,
    (students) => students[randNumber({ max: students.length - 1 })],
  );

  readonly schools$ = this.select((state) => state.schools);
  readonly randomSchool$ = this.select(
    this.schools$,
    (schools) => schools[randNumber({ max: schools.length - 1 })],
  );

  constructor() {
    super({ teachers: [], students: [], schools: [] });
  }

  addTeacher = this.updater(
    (state, teacher: Teacher): AppState => ({
      ...state,
      teachers: [...state.teachers, teacher],
    }),
  );

  updateTeacher = this.updater(
    (state, teacher: Teacher): AppState => ({
      ...state,
      teachers: state.teachers.map((t) => (t.id === teacher.id ? teacher : t)),
    }),
  );

  addStudent = this.updater(
    (state, student: Student): AppState => ({
      ...state,
      students: [...state.students, student],
    }),
  );

  updateSudent = this.updater(
    (state, student: Student): AppState => ({
      ...state,
      students: state.students.map((t) => (t.id === student.id ? student : t)),
    }),
  );

  addSchool = this.updater(
    (state, school: School): AppState => ({
      ...state,
      schools: [...state.schools, school],
    }),
  );

  updateSchool = this.updater(
    (state, school: School): AppState => ({
      ...state,
      schools: state.schools.map((t) => (t.id === school.id ? school : t)),
    }),
  );
}
