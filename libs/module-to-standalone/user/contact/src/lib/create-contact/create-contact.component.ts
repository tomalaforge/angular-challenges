import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  template: `Create Contact Form

    <button
      routerLink=".."
      class="border bg-gray-700 rounded-lg p-2 text-white ml-5">
      Back
    </button> `,
})
export class CreateContactComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CreateContactComponent }]),
  ],
  declarations: [CreateContactComponent],
})
export class CreateContactModule {}
