import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { PersonComponent } from './person.component';
import { SearchFieldComponent } from './search-field.component';

@Component({
  selector: 'app-person-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-search-field (searchFieldOutput)="addName($event)" />

    <mat-list class="flex w-full">
      @for (name of names(); track $index) {
        <app-person [name]="name" />
      } @empty {
        Empty list
      }
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  imports: [
    CommonModule,
    MatListModule,
    MatChipsModule,
    CDFlashingDirective,
    SearchFieldComponent,
    PersonComponent,
  ],
})
export class PersonListComponent {
  readonly names = input<string[]>([]);
  readonly title = input<string>('');
  public index = 0;
  public name = '';

  addName(value: string) {
    this.names().unshift(value);
  }

  userByName(index: number, name: string) {
    return name;
  }
}
