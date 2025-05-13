import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';

@Component({
  selector: 'app-home',
  imports: [NavButtonComponent],
  template: `
    <nav-button [href]="'/foo'" class="fixed left-1/2 top-3">
      Foo Page
    </nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button [href]="'/home'" [fragment]="'bottom'">
        Scroll Bottom
      </nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button [href]="'/home'" [fragment]="'top'">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {}
