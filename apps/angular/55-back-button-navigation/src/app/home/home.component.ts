import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
