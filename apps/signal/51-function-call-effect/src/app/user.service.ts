import { Injectable, signal, untracked } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  name = untracked(signal('Thomas'));

  // name is considered a dependency by Angular

  log(message: string) {
    console.log(`${this.name}: ${message}`);
  }
}

// https://blog.angular-university.io/angular-signals/
// https://marmicode.io/blog/angular-signals-and-custom-render-strategies

// This doesn't seem correct but it appears to work fine
// I envisioned using an effect or using the untracked inside log function
