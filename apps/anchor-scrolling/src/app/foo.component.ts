import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <a routerLink="/home">
      <nav-button class="fixed top-3 left-1/2">Home Page</nav-button></a
    >

    <div class="h-screen bg-blue-200">section 1</div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
