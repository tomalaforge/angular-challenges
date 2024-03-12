import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <nav-button routerLink="/home" class="fixed left-1/2 top-3">
      Home Page
    </nav-button>
    <div id="top" class="h-screen bg-blue-200">
      section 1
      <nav-button routerLink="/foo" fragment="bottom">Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-red-200">
      section 2w
      <nav-button routerLink="/foo" fragment="top">Scroll Top</nav-button>
    </div>
  `,
})
export class FooComponent {}
