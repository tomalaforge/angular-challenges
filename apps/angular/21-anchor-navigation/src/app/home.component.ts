import { Component } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  imports: [NavButtonComponent, RouterLink, MatNavList, NavButtonComponent],
  selector: 'app-home',
  template: `
    <div id="top" class="h-screen bg-gray-500">
      <mat-nav-list>
        <h2>Welcome to home page</h2>
        <app-nav-button [routerLink]="['/foo']" class="fixed left-1/2 top-3">
          Foo Page
        </app-nav-button>
      </mat-nav-list>

      <div>
        <app-nav-button [routerLink]="[]" fragment="bottom">
          Scroll Bottom
        </app-nav-button>
      </div>
    </div>

    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <app-nav-button [routerLink]="[]" fragment="top">
        Scroll Top
      </app-nav-button>
    </div>
  `,
})
export class HomeComponent {}
