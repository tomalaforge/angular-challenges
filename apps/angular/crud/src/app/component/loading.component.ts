import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  template: `<div class="loading-container"><mat-spinner></mat-spinner></div>`,
  styles: `
    .loading-container {
        display: flex;
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 9999;
    }

    .loading-container > :first-child {
        margin: auto;
    }
      `,
})
export class LoadingComponent {}
