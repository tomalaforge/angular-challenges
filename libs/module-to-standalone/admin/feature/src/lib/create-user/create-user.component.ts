import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-user',
  templateUrl: './create-user.component.html',
  imports: [RouterLink],
  standalone: true,
})
export default class CreateUserModule {}
