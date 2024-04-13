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

export const randTeacher = (): Teacher => {
  const teacher = new Teacher();
  teacher.id = factoryTeacher();
  teacher.firstName = randFirstName();
  teacher.lastName = randLastName();
  teacher.subject = rand(subject);
  return teacher;
};

const teachers: Teacher[] = [
  randTeacher(),
  randTeacher(),
  randTeacher(),
  randTeacher(),
];

const factoryStudent = incrementalNumber();

export const randStudent = (): Student => {
  const student = new Student();
  student.id = factoryStudent();
  student.firstName = randFirstName();
  student.lastName = randLastName();
  student.mainTeacher = teachers[randNumber({ max: teachers.length - 1 })];
  student.school = randWord();
  return student;
};

const students: Student[] = [
  randStudent(),
  randStudent(),
  randStudent(),
  randStudent(),
  randStudent(),
];

const factoryCity = incrementalNumber();

export const randomCity = (): City => {
  const city = new City();
  city.id = factoryCity();
  city.name = randCity();
  city.country = randCountry();
  return city;
};

const cities = [randomCity(), randomCity(), randomCity()];

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  fetchTeachers$ = timer(500).pipe(map(() => teachers));
  fetchStudents$ = timer(500).pipe(map(() => students));
  fetchCities$ = timer(500).pipe(map(() => cities));
}
