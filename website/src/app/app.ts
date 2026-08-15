import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsentBanner } from './shared/consent-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConsentBanner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-challenges-website');
}
