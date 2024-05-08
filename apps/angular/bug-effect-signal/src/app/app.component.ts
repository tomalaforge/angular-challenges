import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    Show Dialog if one checkbox is checked
    <input type="checkbox" [(ngModel)]="name" />
    Name
    <input type="checkbox" [(ngModel)]="age" />
    Age
    <input type="checkbox" [(ngModel)]="address" />
    Address
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = model(false);
  age = model(false);
  address = model(false);

  constructor() {
    // Assuming I correctly understand that the goal is to show the alert
    // whenever any of them is checked (independent of whether any others are
    // selected), and that we shouldn't show the alert when any of them
    // unchecked, then each signal needs to be considered separately.
    //
    // The problem with the previous implementation is that `||` is
    // short-circuiting; if the first signal is true, the second and third
    // signals are never checked, so we don't get the desired effect on
    // subsequent checkboxes.
    //
    // If JavaScript had the '|' operator like Java, then we could use that
    // instead.
    effect(() => {
      if (this.name()) {
        alert('Checkbox was checked');
      }
    });
    effect(() => {
      if (this.age()) {
        alert('Checkbox was checked');
      }
    });
    effect(() => {
      if (this.address()) {
        alert('Checkbox was checked');
      }
    });
  }
}
