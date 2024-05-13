/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  styles: [
    `
      :host-context(.styleblue15) {
        --color-elegido: blue;
        --tamaño-elegido: 15px;
      }
      :host-context(.styledefault) {
        --color-elegido: black;
        --tamaño-elegido: 10px;
      }
      :host-context(.styleerror) {
        --color-elegido: red;
        --tamaño-elegido: 30px;
      }
      :host-context(.stylewarning) {
        --color-elegido: orange;
        --tamaño-elegido: 25px;
      }
      .element {
        font-size: var(--tamaño-elegido);
        color: var(--color-elegido);
      }
    `,
  ],
  template: `
    <p class="element">
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {}
