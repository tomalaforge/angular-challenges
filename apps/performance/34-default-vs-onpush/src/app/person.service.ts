import { Injectable, signal } from '@angular/core';
import { randFirstName } from '@ngneat/falso';

@Injectable()
export class PersonService {
  private _list = signal<string[]>([]);
  list = this._list.asReadonly();

  initList(gender: 'male' | 'female') {
    this._list.set(randFirstName({ gender, length: 10 }));
  }

  add(name: string) {
    this._list.update((names) => [...names, name]);
  }
}
