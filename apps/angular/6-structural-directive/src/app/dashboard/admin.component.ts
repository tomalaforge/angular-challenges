import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '../layout/main.component';

@Component({
  selector: 'app-dashboard',
  imports: [MainLayoutComponent],
  template: `
    <app-main>dashboard for Admin works!</app-main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}
