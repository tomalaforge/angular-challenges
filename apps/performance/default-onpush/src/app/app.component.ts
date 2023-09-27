import { ChangeDetectionStrategy, Component } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { PersonListComponent } from './person-list.component';
import { RandomComponent } from './random.component';
import { InputComponent } from './input.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <app-random />
    <div class="flex ">
      <app-input [names]="girlList" />
      <app-input [names]="boyList" />
    </div>
    <div class="flex">
      <app-person-list [names]="girlList" title="Female" />
      <app-person-list [names]="boyList" title="Male" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PersonListComponent, RandomComponent, InputComponent],
})
export class AppComponent {
  girlList = randFirstName({ gender: 'female', length: 10 });
  boyList = randFirstName({ gender: 'male', length: 10 });
}
