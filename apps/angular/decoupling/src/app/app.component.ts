import {
  BtnDisabledDirective,
  BtnDisabledOptimizedDirective,
} from '@angular-challenges/decoupling/brain';
import {
  BtnHelmetDirective,
  BtnHelmetOptimizedDirective,
} from '@angular-challenges/decoupling/helmet';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    BtnDisabledDirective,
    BtnHelmetDirective,
    BtnDisabledOptimizedDirective,
    BtnHelmetOptimizedDirective,
  ],
  selector: 'app-root',
  template: `
    <button btnDisabled hlm>Coucou</button>
    <button btnDisabledOptimized hlmOptimized>Coucou Optimized</button>
  `,
})
export class AppComponent {}
