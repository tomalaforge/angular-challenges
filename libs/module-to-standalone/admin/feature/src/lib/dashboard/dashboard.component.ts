import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  template: `
    Dashboard

    <button
      routerLink="create-user"
      class="ml-10 rounded-lg border bg-gray-700 p-2 text-white">
      Create User
    </button>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class DashboardComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    DashboardComponent,
  ],
})
export class DashboardModule {}
