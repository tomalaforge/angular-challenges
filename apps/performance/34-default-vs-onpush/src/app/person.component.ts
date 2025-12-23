import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { PersonListComponent } from './person-list.component';
import { PersonFormComponent } from './person.form.component';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  imports: [TitleCasePipe, PersonListComponent, PersonFormComponent],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <person-form (addLabel)="onAddLabel($event)" />
    <app-person-list [names]="names()" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  providers: [PersonService],
})
export class PersonComponent implements OnInit {
  service = inject(PersonService);
  title = input('');
  gender = input<'male' | 'female'>('male');
  names = this.service.list;

  ngOnInit(): void {
    this.service.initList(this.gender());
  }

  onAddLabel(label: string) {
    this.service.add(label);
  }
}
