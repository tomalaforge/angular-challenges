import { BtnDisabledDirective } from '@angular-challenges/decoupling/brain';
import { BtnHelmetDirective } from '@angular-challenges/decoupling/helmet';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [BtnDisabledDirective, BtnHelmetDirective],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <button btnDisabled hlm>Coucou</button>
  `,
})
export class AppComponent {}
