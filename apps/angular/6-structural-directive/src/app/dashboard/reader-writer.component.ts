import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '../layout/main.component';

@Component({
  selector: 'app-reader-writer',
  imports: [CommonModule, MainLayoutComponent],
  template: `
    <app-main>reader writer dashboard works!</app-main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderWriterDashboardComponent {}
