import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <label for="agree">Agreed</label>
    <input
      class="ml-2"
      id="agree"
      type="checkbox"
      [value]="check"
      (input)="toggleCheck()" />
    <button
      class="ml-10 rounded-lg border p-2"
      [class.bg-gray-500]="!check"
      [class.text-white]="!check"
      [disabled]="!check">
      Submit
    </button>
  `,
})
export class AppComponent {
  check = false;

  toggleCheck() {
    this.check = !this.check;
  }
}
