import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'unknown-person',
  standalone: true,
  imports: [NgIf],
  template: `
    <div
      class="bg-black absolute inset-0 z-10 text-white text-center text-3xl"
      [style.height.%]="100 - step">
      <div
        class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        *ngIf="step !== 100">
        Who is here?
      </div>
    </div>
    <div class="text-center text-white text-4xl">Happy Christmas !!!</div>
    <div class="container">
      <div class="santa">
        <div class="hand-l"></div>
        <div class="hand-r"></div>
        <div class="hat"></div>
        <div class="face">
          <div class="beard"></div>
          <div class="eyes"></div>
        </div>
        <div class="belt"></div>
        <div class="shoe"></div>
      </div>
    </div>
  `,
  styleUrls: [`unknown-person.component.css`],
})
export class UnknownPersonComponent {
  @Input({ required: true }) step!: number;
}
