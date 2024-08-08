import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  host: {
    class: 'flex flex-col p-4 gap-3',
  },
  templateUrl: './app.component.html',
  imports: [RouterLink, RouterOutlet],
})
export class AppComponent {}
