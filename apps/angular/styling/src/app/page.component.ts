/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <div class="colorblue size15">
      <!--
        <static-text type="error"></static-text>
        <static-text type="warning"></static-text>
        <text [font]="15" color="blue">This is a blue text</text>
      -->
      <static-text class="colordefault sizedefault"></static-text>
      <static-text class="errorcolor errorsize"></static-text>
      <static-text class="warningcolor warningsize"></static-text>
      <text>This is a blue text</text>
    </div>
  `,
})
export class PageComponent {}
