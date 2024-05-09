/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  styles: [
    `
      :host-context(.colorblue) .colorfuente {
        color: blue;
      }
      :host-context(.size15) .tamanyofuente {
        font-size: 15px;
      }
      :host-context(.colordefault) .colorfuente {
        color: black;
      }
      :host-context(.sizedefault) .tamanyofuente {
        font-size: 10px;
      }
      :host-context(.errorcolor) .colorfuente {
        color: red;
      }
      :host-context(.errorsize) .tamanyofuente {
        font-size: 30px;
      }
      :host-context(.warningcolor) .colorfuente {
        color: orange;
      }
      :host-context(.warningsize) .tamanyofuente {
        font-size: 25px;
      }
    `,
  ],
  template: `
    <!-- <p style="font-size: {{ font }}px; color: {{ color }}">
      <ng-content></ng-content>
    </p> -->
    <p class="tamanyofuente colorfuente">
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {
  // @Input() font = 10;
  // @Input() color = 'black';
}
