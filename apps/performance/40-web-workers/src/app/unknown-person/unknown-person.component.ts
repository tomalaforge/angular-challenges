import { Component, input } from '@angular/core';

@Component({
  selector: 'unknown-person',
  template: `
    <div
      class="absolute inset-0 z-10 bg-black text-center text-3xl text-white"
      [style.height.%]="100 - step()">
      @if (step() !== 100) {
        <div
          class="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Who is here?
        </div>
      }
    </div>
    <div class="text-center text-4xl text-white">Happy Christmas !!!</div>
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
  step = input.required<number>();
}
