import { Injectable, signal } from '@angular/core';
import { randFirstName } from '@ngneat/falso';

@Injectable()
export class PersonService {
  private _list = signal<string[]>([]);
  list = this._list.asReadonly();

  initList(gender: 'male' | 'female') {
    if (gender === 'male') {
      this._list.set(randFirstName({ gender: 'male', length: 10 }));
    } else {
      this._list.set(randFirstName({ gender: 'female', length: 10 }));
    }
  }

  add(name: string) {
    this._list.update((names) => [...names, name]);
  }
}
