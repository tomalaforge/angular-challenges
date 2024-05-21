import { Injectable, signal, untracked } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  name = signal('Thomas');

  log(message: string) {
    console.log(`${untracked(() => this.name())}: ${message}`);
  }
}
