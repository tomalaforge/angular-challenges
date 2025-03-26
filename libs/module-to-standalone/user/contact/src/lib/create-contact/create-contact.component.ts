import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  template: `
    Create Contact Form

    <button
      routerLink=".."
      class="ml-5 rounded-lg border bg-gray-700 p-2 text-white">
      Back
    </button>
  `,
  standalone: false,
})
export class CreateContactComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CreateContactComponent }]),
  ],
  declarations: [CreateContactComponent],
})
export class CreateContactModule {}
