import { Injectable, signal } from '@angular/core';

export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

export interface User {
  name: string;
  address: Address;
  note: string;
  title: string;
  salary: number;
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly _name = signal('Bob');
  private readonly _note = signal('');
  private readonly _title = signal('');
  private readonly _salary = signal(0);
  private readonly _address = {
    street: signal(''),
    zipCode: signal(''),
    city: signal(''),
  };

  readonly name = this._name.asReadonly();
  readonly note = this._note.asReadonly();
  readonly title = this._title.asReadonly();
  readonly salary = this._salary.asReadonly();
  readonly address = {
    street: this._address.street.asReadonly(),
    zipCode: this._address.zipCode.asReadonly(),
    city: this._address.city.asReadonly(),
  };

  updateUser(
    updates: Partial<User & { street: string; zipCode: string; city: string }>,
  ) {
    if (updates.name !== undefined) {
      this._name.set(updates.name);
    }
    if (updates.street !== undefined) {
      this._address.street.set(updates.street);
    }
    if (updates.zipCode !== undefined) {
      this._address.zipCode.set(updates.zipCode);
    }
    if (updates.city !== undefined) {
      this._address.city.set(updates.city);
    }
    if (updates.note !== undefined) {
      this._note.set(updates.note);
    }
    if (updates.title !== undefined) {
      this._title.set(updates.title);
    }
    if (updates.salary !== undefined) {
      this._salary.set(updates.salary);
    }
  }
}
