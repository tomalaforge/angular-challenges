import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: UserHomeComponent }]),
    UserHomeComponent,
  ],
})
export class UserHomeModule {}
