import { BtnDisabledDirective } from '@angular-challenges/decoupling/brain';
import { BtnHelmetDirective } from '@angular-challenges/decoupling/helmet';
import { Component } from '@angular/core';

@Component({
  imports: [BtnDisabledDirective, BtnHelmetDirective],
  selector: 'app-root',
  template: `
    <button btnDisabled hlm>Coucou</button>
  `,
})
export class AppComponent {}
