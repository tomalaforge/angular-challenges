import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-contact-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterLink],
})
export default class ContactDashboardComponent {}
