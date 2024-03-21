import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent],
  selector: 'app-home',
  template: `
    <nav-button routerLink="/foo" class="fixed left-1/2 top-3">
      Foo Page
    </nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Home Page
      <nav-button routerLink="/home" fragment="bottom">
        Scroll Bottom
      </nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button routerLink="/home" fragment="top">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {}
