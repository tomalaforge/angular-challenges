/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <!-- in second solution there is no necessity to write class attributes: => (class="text-class") in html elements -->
    <static-text class="text-class"></static-text>
    <static-text class="error"></static-text>
    <static-text class="warning"></static-text>
    <text class="page">This is a blue text</text>
  `,
  styles: [
    `
      /* ==== FIRST SOLUTION ==== */
      /*:host {*/
      /*  .text-class {*/
      /*    font-size: 10px;*/
      /*    color: black;*/
      /*  }*/
      /*  .error {*/
      /*    font-size: 30px;*/
      /*    color: red;*/
      /*  }*/
      /*  .warning {*/
      /*    font-size: 25px;*/
      /*    color: orange;*/
      /*  }*/
      /*  .page {*/
      /*    font-size: 15px;*/
      /*    color: blue;*/
      /*  }*/
      /*} */

      /* ==== SECOND SOLUTION ==== */
      /* in the second solution there is no necessity to write class attributes in html elements*/
      /*:host {*/
      /*  :nth-child(1) {*/
      /*    font-size: 10px;*/
      /*    color: black;*/
      /*  }*/
      /*  :nth-child(2){*/
      /*    font-size: 30px;*/
      /*    color: red;*/
      /*  }*/
      /*  :nth-child(3){*/
      /*    font-size: 25px;*/
      /*    color: orange;*/
      /*  }*/
      /*  :nth-child(4){*/
      /*    font-size: 15px;*/
      /*    color: blue;*/
      /*  }*/
      /*}*/

      /* ==== THIRD SOLUTION ==== */
      text {
        --text-font-size: 15px;
        --text-color: blue;
      }
    `,
  ],
})
export class PageComponent {}
