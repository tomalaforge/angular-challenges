import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  untracked,
} from '@angular/core';
import {
  apply,
  disabled,
  FieldState,
  form,
  FormField,
  required,
  SchemaPathTree,
  submit,
} from '@angular/forms/signals';
import { AddressFormComponent } from './address-form.component';

type AddressGroup = {
  street: string;
  zipcode: string;
  city: string;
};

type CheckoutForm = {
  firstName: string;
  lastName: string;
  shipping: AddressGroup;
  billing: AddressGroup;
  sameAsShipping: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormField, AddressFormComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-slate-50 text-slate-900">
      <div class="mx-auto max-w-4xl px-6 py-12">
        <h1 class="mb-6 text-3xl font-semibold">Order</h1>
        <form
          (submit)="onSubmit($event)"
          novalidate
          class="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Information</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Last name
                <input
                  class="input"
                  type="text"
                  [formField]="form.lastName"
                  aria-required="true" />
                <span class="hint">
                  @if (showError(form.lastName())) {
                    This field is required
                  }
                </span>
              </label>
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                First name
                <input
                  class="input"
                  type="text"
                  [formField]="form.firstName"
                  aria-required="true" />
                <span class="hint">
                  @if (showError(form.firstName())) {
                    This field is required
                  }
                </span>
              </label>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Shipping address</h2>
            <app-address-form
              [formField]="form.shipping"
              [fieldTree]="form.shipping" />
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Billing address</h2>
              <label
                class="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  [formField]="form.sameAsShipping" />
                Billing address same as shipping
              </label>
            </div>

            @if (!form.sameAsShipping().value()) {
              <app-address-form
                [formField]="form.billing"
                [fieldTree]="form.billing" />
            }
          </section>

          <div
            class="flex items-center justify-between border-t border-slate-200 pt-4">
            <div class="text-sm text-slate-600">
              <span [class.text-rose-600]="form().invalid()">
                {{ form().invalid() ? 'Form incomplete' : 'Ready to submit' }}
              </span>
            </div>
            <button
              type="submit"
              class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300">
              Submit
            </button>
          </div>
        </form>

        <section
          class="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="mb-2 text-lg font-semibold">Preview</h3>
          <pre
            class="overflow-x-auto rounded bg-slate-900 p-4 text-sm text-slate-100"
            >{{ form().value() | json }}</pre
          >
        </section>
      </div>
    </main>
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
export class AppComponent {
  model = signal<CheckoutForm>({
    firstName: '',
    lastName: '',
    shipping: {
      street: '',
      zipcode: '',
      city: '',
    },
    billing: {
      street: '',
      zipcode: '',
      city: '',
    },
    sameAsShipping: false,
  });

  form = form(this.model, (schema) => {
    required(schema.firstName);
    required(schema.lastName);
    required(schema.billing, {
      when: ({ valueOf }) => valueOf(schema.sameAsShipping),
    });
    apply(schema.shipping, this.addressSchema);
    apply(schema.billing, this.addressSchema);
    disabled(schema.billing, ({ valueOf }) => valueOf(schema.sameAsShipping));
  });

  constructor() {
    effect(() => {
      const checked = this.form.sameAsShipping().value();

      if (checked) {
        untracked(() => {
          this.form.billing().value.set(this.form.shipping().value());
        });
      }
    });
  }

  addressSchema(item: SchemaPathTree<AddressGroup>) {
    required(item.street);
    required(item.zipcode);
    required(item.city);
  }

  async onSubmit($event: Event): Promise<void> {
    // TODO: to be removed in 21.2 and replaced by formRoot directive
    $event.preventDefault();

    await submit(this.form, async () => {
      // TODO: add submit logic
    });
  }

  showError<T>(field: FieldState<T>): boolean {
    return field.invalid() && (field.touched() || field.dirty());
  }
}
