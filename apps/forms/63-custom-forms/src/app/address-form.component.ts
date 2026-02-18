import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  FieldState,
  FieldTree,
  FormField,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';

interface AddressGroup {
  street: string;
  zipcode: string;
  city: string;
}

export const defaultAddress: AddressGroup = {
  street: '',
  zipcode: '',
  city: '',
};

export const addressSchema = (item: SchemaPathTree<AddressGroup>) => {
  required(item.street);
  required(item.zipcode);
  required(item.city);
};

@Component({
  selector: 'app-address-form',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4 sm:grid-cols-2" data-testid="shipping-fields">
      <label
        class="flex flex-col gap-1 text-sm font-medium text-slate-700 sm:col-span-2">
        Street
        <input class="input" type="text" [formField]="form().street" />
        <span class="hint">
          @if (showError(form().street())) {
            This field is required
          }
        </span>
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
        ZIP code
        <input class="input" type="text" [formField]="form().zipcode" />
        <span class="hint">
          @if (showError(form().zipcode())) {
            This field is required
          }
        </span>
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
        City
        <input class="input" type="text" [formField]="form().city" />
        <span class="hint">
          @if (showError(form().city())) {
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
export class AddressFormComponent {
  form = input.required<FieldTree<AddressGroup>>();

  showError<T>(field: FieldState<T>): boolean {
    return field.invalid() && (field.touched() || field.dirty());
  }
}
