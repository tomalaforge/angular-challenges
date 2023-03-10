import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styles: [
    `
      h1 {
        margin-bottom: 0;
      }
      nav a {
        padding: 1rem;
        text-decoration: none;
        margin-top: 10px;
        display: inline-block;
        background-color: #e8e8e8;
        color: #3d3d3d;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      nav a:hover {
        color: white;
        background-color: #42545c;
      }
      nav a.active {
        background-color: black;
      }
    `,
  ],
  template: `
    <h1>Library</h1>

    <nav>
      <a routerLink="/search" routerLinkActive="active">Borrow a Book</a>
    </nav>

    <router-outlet />
  `,
})
export class AppComponent {}
