import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { generateList } from './generateList';
import { PersonService } from './list.service';
import { PersonListComponent } from './person-list.component';

@Component({
  imports: [
    PersonListComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PersonService],
  selector: 'app-root',
  template: `
    <button
      (click)="loadList.set(true)"
      class="rounded-md border border-black p-2">
      Load List
    </button>

    @if (loadList()) {
      <app-person-list class="w-3/4 max-w-2xl" [persons]="persons()" />
    }
  `,
  host: {
    class: 'flex items-center flex-col gap-5',
  },
})
export class AppComponent {
  readonly persons = signal(generateList());
  readonly loadList = signal(false);

  label = '';
}
