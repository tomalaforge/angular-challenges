import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <label for="agree">Agreed</label>
    <input
      class="ml-2"
      id="agree"
      data-testid="checkbox"
      type="checkbox"
      [value]="check"
      (input)="toggleCheck()" />
    <button
      class="border p-2 rounded-lg ml-10"
      [class.bg-gray-500]="!check"
      [class.text-white]="!check"
      [disabled]="!check">
      Submit
    </button>`,
})
export class AppComponent {
  check = false;

  toggleCheck() {
    this.check = !this.check;
  }
}
