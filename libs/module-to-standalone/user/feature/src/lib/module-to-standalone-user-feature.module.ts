import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterModule, Route } from '@angular/router';
import { moduleToStandaloneUserFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleToStandaloneUserFeatureRoutes),
    RouterModule,
  ],
})
export class ModuleToStandaloneUserFeatureModule {}
