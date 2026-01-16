import { Component } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  imports: [NavButtonComponent, RouterLink, MatNavList],
  selector: 'app-foo',
  template: `
    <div class="h-screen bg-blue-200">
      <mat-nav-list>
        <h2>Welcome to foo page</h2>
        <app-nav-button [routerLink]="['/home']" class="fixed left-1/2 top-3">
          Home Page
        </app-nav-button>
      </mat-nav-list>
    </div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
