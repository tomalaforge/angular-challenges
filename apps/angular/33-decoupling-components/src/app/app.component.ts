import { BtnDisabledDirective } from '@angular-challenges/decoupling/brain';
import { BtnHelmetDirective } from '@angular-challenges/decoupling/helmet';
import { Component, signal } from '@angular/core';

@Component({
  imports: [BtnDisabledDirective, BtnHelmetDirective],
  selector: 'app-root',
  template: `
    <button
      btnDisabled
      (stateChanged)="onStateChange($event)"
      hlm
      [btnState]="btnState()">
      Coucou
    </button>
  `,
})
export class AppComponent {
  readonly btnState = signal<'enabled' | 'disabled'>('disabled');

  readonly onStateChange = (state: 'enabled' | 'disabled') => {
    this.btnState.set(state);
  };
}
