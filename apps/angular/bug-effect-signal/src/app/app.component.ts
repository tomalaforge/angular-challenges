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
    effect(() => {
      /* 
        This effect executes only once when name is true, because the value of name doesn't change.
        Effects run when a signal inside changes, since name value is the same as before, the effect doesn't trigger.
        If we click on age first, the effect will run again after click on name. 
        Because there is no signal value which has the same value as before.
      */
      // if (this.name() || this.age() || this.address()) {
      //   alert('Checkbox was checked');
      // }
      /* 
        This effect should run if any of these 3 values is true, you have to define those values.
        With this all signal values are interpreted as relevant values for this effect.
        So if any of these values changes, the effect will run.
      */
      const name = this.name();
      const age = this.age();
      const address = this.address();
      if (name || age || address) {
        alert('Checkbox was checked');
      }
    });
  }
}
