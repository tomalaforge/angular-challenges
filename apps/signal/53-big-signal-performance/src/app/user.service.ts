import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  name = signal('Bob');
  street = signal('');
  zipCode = signal('');
  city = signal('');
  note = signal('');
  title = signal('');
  salary = signal(0);
}
