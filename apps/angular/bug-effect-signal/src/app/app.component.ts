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
      if (this.name() || this.age() || this.address()) {
        alert('Checkbox was checked');
      }
    });
  }
}
