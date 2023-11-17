import { Component } from '@angular/core';
import { screen, logRoles } from '@testing-library/angular';
import {prettyDOM} from '@testing-library/dom'
@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="policy">
      <label for="agree">Agreed</label>
      <input
        class="ml-2"
        id="agree"
        type="checkbox"
        [value]="check"
        (input)="toggleCheck()" />
      <button
        class="border p-2 rounded-lg ml-10"
        [class.bg-gray-500]="!check"
        [class.text-white]="!check"
        [disabled]="!check">
        Submit
      </button>
    </div>
  `,
})
export class AppComponent {
  check = false;

  async toggleCheck() {
    this.check = !this.check;

    // for testing purposes (working in console)

    const checkbox = await screen.getByLabelText('Agreed');
    const submitBtn = await screen.getByRole('button', { name: 'Submit' });
    const container = document.querySelector('#policy') ?? undefined;
    screen.debug(checkbox);
    screen.debug();
    logRoles(submitBtn);
    screen.logTestingPlaygroundURL(container);
    console.log(prettyDOM(div))
  }
}
