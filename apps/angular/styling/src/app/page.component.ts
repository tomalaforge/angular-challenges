/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <div class="styleblue15">
      <static-text class="styledefault"></static-text>
      <static-text class="styleerror"></static-text>
      <static-text class="stylewarning"></static-text>
      <text>This is a blue text</text>
    </div>
  `,
})
export class PageComponent {}
