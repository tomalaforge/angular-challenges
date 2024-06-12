import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  userName = signal('Bob');
  userAddressStreet = signal('');
  userAddressZipCode = signal('');
  userAddressCity = signal('');
  userNote = signal('');
  userTitle = signal('');
  userSalary = signal(0);
}
