import { City } from '../model/city.model';
import { EntityWithId } from '../model/entity-with-id.model';
import { Person } from '../model/person.model';
import { Student } from '../model/student.model';
import { Teacher } from '../model/teacher.model';

export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

export function isEntityWithId(value: unknown): value is EntityWithId {
  return isObject(value) && 'id' in value;
}

export function isPersonEntity(value: unknown): value is Person {
  return isEntityWithId(value) && 'firstName' in value && 'lastName' in value;
}

export function isCityEntity(value: unknown): value is City {
  return isEntityWithId(value) && 'name' in value && 'country' in value;
}

export function isTeacherEntity(value: unknown): value is Teacher {
  return isPersonEntity(value) && 'subject' in value;
}

export function isStudentEntity(value: unknown): value is Student {
  return isPersonEntity(value) && 'mainTeacher' in value && 'school' in value;
}
