import { Injectable, signal, untracked } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  name = signal('Thomas');

  // name is considered a dependency by Angular

  log(message: string) {
    console.log(untracked(() => this.name()) + ':' + message);
  }
}

// https://blog.angular-university.io/angular-signals/
// https://marmicode.io/blog/angular-signals-and-custom-render-strategies
