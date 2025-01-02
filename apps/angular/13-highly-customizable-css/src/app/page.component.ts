/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  imports: [TextStaticComponent, TextComponent],
  template: `
    <static-text></static-text>
    <static-text type="error"></static-text>
    <static-text type="warning"></static-text>
    <text [font]="15" color="blue">This is a blue text</text>
  `,
})
export class PageComponent {}
