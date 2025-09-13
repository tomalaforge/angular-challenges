import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '../layout/main.component';

@Component({
  selector: 'app-client',
  imports: [CommonModule, MainLayoutComponent],
  template: `
    <app-main>client dashboard works!</app-main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardComponent {}
