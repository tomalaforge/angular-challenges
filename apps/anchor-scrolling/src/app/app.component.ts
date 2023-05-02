import { Component } from '@angular/core';
import { AnchorButtonComponent } from './anchor-button.component';

@Component({
  standalone: true,
  imports: [AnchorButtonComponent],
  selector: 'app-root',
  template: `
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <anchor-button href="#bottom">Scroll Bottom</anchor-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <anchor-button href="#top">Scroll Top</anchor-button>
    </div>
  `,
})
export class AppComponent {}
