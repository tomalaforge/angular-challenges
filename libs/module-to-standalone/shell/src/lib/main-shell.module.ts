import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './main-shell.routes';

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [provideToken('main-shell-token')],
})
export class MainShellModule {}
