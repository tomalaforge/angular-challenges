/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p>
      <ng-content></ng-content>
    </p>
  `,
  styles: `
    :host {
      &:not(.blue-text) {
        font-size: 10px;
        color: black;
      }

      &.blue-text {
        font-size: 15px;
        color: blue;
      }
    }

    :host-context(.error) p {
      font-size: 30px;
      color: red;
    }

    :host-context(.warning) p {
      font-size: 25px;
      color: orange;
    }
  `,
})
export class TextComponent {}
