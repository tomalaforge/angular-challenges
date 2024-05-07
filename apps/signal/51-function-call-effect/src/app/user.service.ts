import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  name = signal('Thomas');

  log(message: string) {
    console.log(`${this.name()}: ${message}`);
  }
}
