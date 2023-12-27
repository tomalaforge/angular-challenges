import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent } from './input.component';
import { ListComponent } from './list.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [TitleCasePipe, ListComponent, InputComponent],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>
    <app-input input (add)="add($event)" />
    <app-list list [names]="names" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() title = '';
  @Input() names!: string[];
  add(name: string) {
    this.names = [name, ...this.names];
  }
}
