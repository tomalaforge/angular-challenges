import { Injectable } from '@angular/core';
import {
  incrementalNumber,
  rand,
  randCity,
  randCountry,
  randFirstName,
  randLastName,
  randNumber,
  randWord,
} from '@ngneat/falso';
import { map, timer } from 'rxjs';
import { City } from '../model/city.model';
import { Student } from '../model/student.model';
import { Teacher, subject } from '../model/teacher.model';

const factoryTeacher = incrementalNumber();

export const randomTeacher = () => ({
  id: factoryTeacher(),
  firstname: randFirstName(),
  lastname: randLastName(),
  subject: rand(subject),
});

const teachers: Teacher[] = [
  randomTeacher(),
  randomTeacher(),
  randomTeacher(),
  randomTeacher(),
];

const factoryStudent = incrementalNumber();

export const randomStudent = (): Student => ({
  id: factoryStudent(),
  firstname: randFirstName(),
  lastname: randLastName(),
  mainTeacher: teachers[randNumber({ max: teachers.length - 1 })],
  school: randWord(),
});

const students: Student[] = [
  randomStudent(),
  randomStudent(),
  randomStudent(),
  randomStudent(),
  randomStudent(),
];

const factoryCity = incrementalNumber();

export const randomCity = (): City => ({
  id: factoryCity(),
  name: randCity(),
  country: randCountry(),
});

const cities = [randomCity(), randomCity(), randomCity()];

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  fetchTeachers$ = timer(500).pipe(map(() => teachers));
  fetchStudents$ = timer(500).pipe(map(() => students));
  fetchCities$ = timer(500).pipe(map(() => cities));
}
