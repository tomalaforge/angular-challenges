import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from '../components/list.component';
import { SearchComponent } from '../components/search.component';

@Component({
  selector: 'app-person-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleCasePipe,
    MatListModule,
    CDFlashingDirective,
    SearchComponent,
    ListComponent,
  ],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-search (newName)="handleNewName($event)" />

    <mat-list class="flex w-full">
      @if (names?.length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (name of names; track $index) {
        <app-list [name]="name" />
      }
      @if (names?.length !== 0) {
        <mat-divider />
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Input() names!: ReadonlyArray<string> | null;
  @Input() title!: string;

  @Output() newName = new EventEmitter<{ title: string; name: string }>();

  handleNewName(name: string) {
    this.newName.emit({ title: this.title, name });
  }
}
