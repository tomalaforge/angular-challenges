import { Injectable, inject, signal } from '@angular/core';
import { randEmail, randFirstName } from '@ngneat/falso';
import { generateList } from './generateList';
import { Person } from './person.model';

@Injectable()
export class PersonService {
  private readonly fakeBackend = inject(FakeBackendService);
  readonly persons = signal<Person[]>([]);

  loadPersons() {
    this.persons.set(generateList());
  }

  deletePerson(email: string) {
    this.persons.set(
      this.fakeBackend
        .returnNewList(this.persons())
        .filter((p) => p.email !== email),
    );
  }

  updatePerson(email: string) {
    this.persons.set(
      this.fakeBackend
        .returnNewList(this.persons())
        .map((p) => (p.email === email ? { email, name: randFirstName() } : p)),
    );
  }

  addPerson(name: string) {
    this.persons.set([
      { email: randEmail(), name },
      ...this.fakeBackend.returnNewList(this.persons()),
    ]);
  }
}

@Injectable({ providedIn: 'root' })
export class FakeBackendService {
  returnNewList = (input: Person[]): Person[] => [
    ...input.map((i) => ({ ...i })),
  ];
}
