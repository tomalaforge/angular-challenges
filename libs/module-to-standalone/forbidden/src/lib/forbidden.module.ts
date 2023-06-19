import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ForbiddenComponent }]),
  ],
})
export class ForbiddenModule {}
