import {
  randSchool,
  randStudent,
  randTeacher,
} from '@angular-challenges/ngrx-notification/model';
import { Injectable, inject } from '@angular/core';
import { randCompanyName, randFirstName } from '@ngneat/falso';
import { concatLatestFrom } from '@ngrx/effects';
import { map, tap, timer } from 'rxjs';
import { FakeDBService } from './fake-db.service';
import { PushService } from './push.service';

@Injectable({ providedIn: 'root' })
export class FakeBackendService {
  private fakeDbService = inject(FakeDBService);
  private pushService = inject(PushService);

  getAllTeachers = () => this.fakeDbService.teachers$;
  getAllStudents = () => this.fakeDbService.students$;
  getAllSchools = () => this.fakeDbService.schools$;

  start() {
    this.fakeAddTeacher();
    this.fakeUpdateTeacher();
    this.fakeAddStudent();
    this.fakeUpdateStudent();
    this.fakeAddSchool();
    this.fakeUpdateSchool();
  }

  private fakeAddTeacher() {
    timer(0, 4000)
      .pipe(
        map(() => randTeacher()),
        tap((teacher) => this.pushService.pushData(teacher)),
        tap((teacher) => this.fakeDbService.addTeacher(teacher)),
      )
      .subscribe();
  }

  private fakeUpdateTeacher() {
    timer(8000, 5000)
      .pipe(
        concatLatestFrom(() => this.fakeDbService.randomTeacher$),
        map(([, teacher]) => ({
          ...teacher,
          firstname: randFirstName(),
          version: teacher.version + 1,
        })),
        tap((teacher) => this.pushService.pushData(teacher)),
        tap((teacher) => this.fakeDbService.updateTeacher(teacher)),
      )
      .subscribe();
  }

  private fakeAddStudent() {
    timer(0, 2000)
      .pipe(
        map(() => randStudent()),
        tap((student) => this.pushService.pushData(student)),
        tap((student) => this.fakeDbService.addStudent(student)),
      )
      .subscribe();
  }

  private fakeUpdateStudent() {
    timer(8000, 6000)
      .pipe(
        concatLatestFrom(() => this.fakeDbService.randomStudents$),
        map(([, student]) => ({
          ...student,
          firstname: randFirstName(),
          version: student.version + 1,
        })),
        tap((student) => this.pushService.pushData(student)),
        tap((student) => this.fakeDbService.updateSudent(student)),
      )
      .subscribe();
  }

  private fakeAddSchool() {
    timer(0, 2000)
      .pipe(
        map(() => randSchool()),
        tap((school) => this.pushService.pushData(school)),
        tap((school) => this.fakeDbService.addSchool(school)),
      )
      .subscribe();
  }

  private fakeUpdateSchool() {
    timer(8000, 4000)
      .pipe(
        concatLatestFrom(() => this.fakeDbService.randomSchool$),
        map(([, school]) => ({
          ...school,
          name: randCompanyName(),
          version: school.version + 1,
        })),
        tap((school) => this.pushService.pushData(school)),
        tap((school) => this.fakeDbService.updateSchool(school)),
      )
      .subscribe();
  }
}
