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
import { subject, Teacher } from '../model/teacher.model';
import { CardType } from '../model/card.model';

const factoryTeacher = incrementalNumber();

export const randTeacher = () => ({
  id: factoryTeacher(),
  firstname: randFirstName(),
  lastname: randLastName(),
  subject: rand(subject),
});

const teachers: Teacher[] = [
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
  mainTeacher: teachers[randNumber({ max: teachers.length })],
  school: randWord(),
});

const students: Student[] = [
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

export const randomizer = {
  [CardType.TEACHER]: randTeacher,
  [CardType.STUDENT]: randStudent,
  [CardType.CITY]: randomCity,
};

const cities = [randomCity(), randomCity(), randomCity()];

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  private streams = {
    [CardType.TEACHER]: teachers,
    [CardType.STUDENT]: students,
    [CardType.CITY]: cities,
  };

  fetch(type: CardType) {
    return timer(500).pipe(map(() => this.streams[type]));
  }
}
