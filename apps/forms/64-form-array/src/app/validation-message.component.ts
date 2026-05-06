import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-validation-message',
  template: `
    @if (
      fieldState().invalid() && (fieldState().touched() || fieldState().dirty())
    ) {
      @for (error of fieldState().errors(); track error.kind) {
        <span class="text-xs text-rose-600">{{ error.message }}</span>
      }
    }
  `,
})
export class ValidationMessageComponent {
  fieldState = input.required<FieldState<unknown>>();
}
