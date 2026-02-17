import { Component, input, model } from '@angular/core';
import {
  FieldState,
  FieldTree,
  FormValueControl,
} from '@angular/forms/signals';

interface AddressFieldGroup {
  street: string;
  zipcode: string;
  city: string;
}

@Component({
  selector: 'app-address-form',
  template: `
    <div class="grid gap-4 sm:grid-cols-2" data-testid="shipping-fields">
      <label
        class="flex flex-col gap-1 text-sm font-medium text-slate-700 sm:col-span-2">
        Street
        <input
          class="input"
          type="text"
          [value]="value().street"
          (input)="updateField('street', $event.target.value)"
          required
          aria-required="true" />
        <span class="hint">
          @if (showError(fieldTree().street())) {
            This field is required
          }
        </span>
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
        ZIP code
        <input
          class="input"
          type="text"
          [value]="value().zipcode"
          (input)="updateField('zipcode', $event.target.value)"
          required
          aria-required="true" />
        <span class="hint">
          @if (showError(fieldTree().zipcode())) {
            This field is required
          }
        </span>
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
        City
        <input
          class="input"
          type="text"
          [value]="value().city"
          (input)="updateField('city', $event.target.value)"
          required
          aria-required="true" />
        <span class="hint">
          @if (showError(fieldTree().city())) {
            This field is required
          }
        </span>
      </label>
    </div>
  `,
  styles: [
    `
      .input {
        @apply w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200;
      }
      .hint {
        @apply text-xs text-rose-600;
      }
    `,
  ],
})
export class AddressFormComponent
  implements FormValueControl<AddressFieldGroup>
{
  value = model<AddressFieldGroup>({
    street: '',
    zipcode: '',
    city: '',
  });

  fieldTree = input.required<FieldTree<AddressFieldGroup>>();

  updateField(field: keyof AddressFieldGroup, value: string) {
    this.value.update((state) => ({
      ...state,
      [field]: value,
    }));
  }

  showError<T>(field: FieldState<T>): boolean {
    return field.invalid() && (field.touched() || field.dirty());
  }
}
