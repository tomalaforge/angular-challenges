import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  template: `Dashboard

    <button
      routerLink="create-user"
      class="border bg-gray-700 rounded-lg p-2 text-white ml-10">
      Create User
    </button> `,
})
export class DashboardComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
