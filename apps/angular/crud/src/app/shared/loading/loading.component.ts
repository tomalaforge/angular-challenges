import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  template: `
    <mat-spinner />
  `,
  styles: [],
  standalone: true,
})
export class LoadingComponent {}
