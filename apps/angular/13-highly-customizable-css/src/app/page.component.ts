/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './ui/text/text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <static-text class="default-theme"></static-text>
    <static-text class="error-theme"></static-text>
    <static-text class="warning-theme"></static-text>
    <text class="blue-theme">This is a blue text</text>
  `,
})
export class PageComponent {}
