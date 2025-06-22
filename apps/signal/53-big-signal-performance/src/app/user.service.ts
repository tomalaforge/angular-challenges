import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  user = {
    name: signal('Bob'),
    address: {
      street: signal(''),
      zipCode: signal(''),
      city: signal(''),
    },
    note: signal(''),
    title: signal(''),
    salary: signal(0),
  };
}
