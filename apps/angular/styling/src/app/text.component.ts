/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  styles: [
    `
      :host-context(.styleblue15) .colorfuente {
        color: blue;
        font-size: 15px;
      }
      :host-context(.styledefault) .colorfuente {
        color: black;
        font-size: 10px;
      }
      :host-context(.styleerror) .colorfuente {
        color: red;
        font-size: 30px;
      }
      :host-context(.stylewarning) .colorfuente {
        color: orange;
        font-size: 25px;
      }
    `,
  ],
  template: `
    <p class="tamanyofuente colorfuente">
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {}
