import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserShellComponent } from './user-shell.component';
import { userShellRoutes } from './user-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(userShellRoutes), RouterModule],
  declarations: [UserShellComponent],
  providers: [provideToken('user-token')],
})
export class UserShellModule {}
