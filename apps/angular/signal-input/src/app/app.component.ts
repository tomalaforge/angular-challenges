import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserComponent } from './user.component';

@Component({
  standalone: true,
  imports: [UserComponent, JsonPipe],
  selector: 'app-root',
  template: `
    <div class="flex flex-col gap-3">
      <div class="flex gap-2 ">
        Name:
        <input #name name="name" class="border" autocomplete="off" />
        @if (showUser && !name.value) {
          <div class="text-sm text-red-500">name required</div>
        }
      </div>
      <div class="flex gap-2 ">
        LastName:
        <input #lastName name="lastName" class="border" autocomplete="off" />
      </div>
      <div class="flex gap-2 ">
        Age:
        <input
          type="number"
          #age
          name="age"
          class="border"
          autocomplete="off" />
      </div>
      <button
        (click)="showUser = true"
        class="w-fit rounded-md border border-blue-500 bg-blue-200 px-4 py-2">
        Submit
      </button>
    </div>
    @if (showUser && !!name.value) {
      <app-user
        [name]="name.value"
        [lastName]="lastName.value"
        [age]="age.value" />
    }
  `,
  host: {
    class: 'p-10 block flex flex-col gap-10',
  },
})
export class AppComponent {
  showUser = false;
}
