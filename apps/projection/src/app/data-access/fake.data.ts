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
import { City, Student, subject, Teacher } from '../model';

const factoryTeacher = incrementalNumber();

export const randTeacher = () => ({
  id: factoryTeacher(),
  firstname: randFirstName(),
  lastname: randLastName(),
  subject: rand(subject),
});

export const teachers: Teacher[] = [
  randTeacher(),
  randTeacher(),
  randTeacher(),
  randTeacher(),
];

const factoryStudent = incrementalNumber();

export const randStudent = (): Student => ({
  id: factoryStudent(),
  firstname: randFirstName(),
  lastname: randLastName(),
  mainTeacher: teachers[randNumber({ max: teachers.length - 1 })],
  school: randWord(),
});

export const students: Student[] = [
  randStudent(),
  randStudent(),
  randStudent(),
  randStudent(),
  randStudent(),
];

const factoryCity = incrementalNumber();

export const randomCity = (): City => ({
  id: factoryCity(),
  name: randCity(),
  country: randCountry(),
});

export const cities = [randomCity(), randomCity(), randomCity()];
