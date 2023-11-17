import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonListComponent } from './person-list.component';

@Component({
  standalone: true,
  imports: [PersonListComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <p>Performance is key!!</p>
    <button
      (click)="loadList = true"
      class="border border-black p-2 rounded-md">
      Load List
    </button>

    <app-person-list
      *ngIf="loadList"
      class="max-w-2xl"
      title="Persons" />
  `,
})
export class AppComponent {
  loadList = false;
}
