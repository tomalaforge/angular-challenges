import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './home.component';

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: UserHomeComponent }]),
  ],
})
export class UserHomeModule {}
