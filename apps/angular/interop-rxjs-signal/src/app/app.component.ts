import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

@Component({
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  selector: 'app-root',
  template: `
    <router-outlet />
    <angular-query-devtools />
  `,
  styles: [''],
})
export class AppComponent {}
