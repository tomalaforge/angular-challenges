import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  user = {
    name: signal('Bob'),
    address: signal({
      street: '',
      zipCode: '',
      city: '',
    }),
    note: signal(''),
    title: signal(''),
    salary: signal(0),
  };
}
