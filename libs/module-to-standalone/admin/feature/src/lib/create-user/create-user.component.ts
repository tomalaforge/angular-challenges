import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'lib-create-user',
  template: `
    Create User Form

    <button
      routerLink=".."
      class="ml-5 rounded-lg border bg-gray-700 p-2 text-white">
      Back
    </button>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class CreateUserComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CreateUserComponent }]),
    CreateUserComponent,
  ],
})
export class CreateUserModule {}
