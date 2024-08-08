import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink],
  standalone: true,
})
export default class DashboardComponent {}
