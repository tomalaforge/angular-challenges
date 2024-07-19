import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  templateUrl: './create-contact.component.html',
  imports: [RouterLink],
  standalone: true,
})
export default class CreateContactComponent {}
