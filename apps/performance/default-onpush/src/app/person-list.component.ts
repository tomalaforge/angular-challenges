import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonInputComponent } from './input.component';
import { ListComponent } from './list.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonInputComponent, ListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-person-input (personName)="getPersonName($event)"></app-person-input>
    <app-list-component [names]="personNames"></app-list-component>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent implements OnInit {
  @Input() names: string[] = [];
  @Input() title = '';
  personNames: string[] = [];
  ngOnInit(): void {
    this.personNames = this.names;
  }
  getPersonName(event: string) {
    this.personNames = [];
    this.names?.unshift(event);
    this.personNames = [...this.names]; // not sure this is the best way. can I use changeDetectoRef instead of this ?
  }
}
