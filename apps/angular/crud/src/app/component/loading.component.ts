import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  template: `<mat-spinner diameter="20"></mat-spinner>`,
})
export class LoadingComponent {}
