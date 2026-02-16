import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type AddressGroup = FormGroup<{
  street: FormControl<string>;
  zipcode: FormControl<string>;
  city: FormControl<string>;
}>;

type CheckoutForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  shipping: AddressGroup;
  billing: AddressGroup;
  sameAsShipping: FormControl<boolean>;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-slate-50 text-slate-900">
      <div class="mx-auto max-w-4xl px-6 py-12">
        <h1 class="mb-6 text-3xl font-semibold">Order</h1>
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
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
                  formControlName="lastName"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(form.controls.lastName)) {
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
                  formControlName="firstName"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(form.controls.firstName)) {
                    This field is required
                  }
                </span>
              </label>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Shipping address</h2>
            <div
              formGroupName="shipping"
              class="grid gap-4 sm:grid-cols-2"
              data-testid="shipping-fields">
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700 sm:col-span-2">
                Street
                <input
                  class="input"
                  type="text"
                  formControlName="street"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(shipping.controls.street)) {
                    This field is required
                  }
                </span>
              </label>
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                ZIP code
                <input
                  class="input"
                  type="text"
                  formControlName="zipcode"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(shipping.controls.zipcode)) {
                    This field is required
                  }
                </span>
              </label>
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                City
                <input
                  class="input"
                  type="text"
                  formControlName="city"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(shipping.controls.city)) {
                    This field is required
                  }
                </span>
              </label>
            </div>
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Billing address</h2>
              <label
                class="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  [checked]="form.controls.sameAsShipping.value"
                  (change)="toggleSameAsShipping()" />
                Billing address same as shipping
              </label>
            </div>

            @if (!form.controls.sameAsShipping.value) {
              <div
                formGroupName="billing"
                class="grid gap-4 sm:grid-cols-2"
                data-testid="billing-fields">
                <label
                  class="flex flex-col gap-1 text-sm font-medium text-slate-700 sm:col-span-2">
                  Street
                  <input
                    class="input"
                    type="text"
                    formControlName="street"
                    required
                    aria-required="true" />
                  <span class="hint">
                    @if (showError(billing.controls.street)) {
                      This field is required
                    }
                  </span>
                </label>
                <label
                  class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  ZIP code
                  <input
                    class="input"
                    type="text"
                    formControlName="zipcode"
                    required
                    aria-required="true" />
                  <span class="hint">
                    @if (showError(billing.controls.zipcode)) {
                      This field is required
                    }
                  </span>
                </label>
                <label
                  class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  City
                  <input
                    class="input"
                    type="text"
                    formControlName="city"
                    required
                    aria-required="true" />
                  <span class="hint">
                    @if (showError(billing.controls.city)) {
                      This field is required
                    }
                  </span>
                </label>
              </div>
            }
          </section>

          <div
            class="flex items-center justify-between border-t border-slate-200 pt-4">
            <div class="text-sm text-slate-600">
              <span [class.text-rose-600]="form.invalid">
                {{ form.invalid ? 'Form incomplete' : 'Ready to submit' }}
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
            >{{ form.getRawValue() | json }}</pre
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
  readonly shipping: AddressGroup = this.createAddressGroup();
  readonly billing: AddressGroup = this.createAddressGroup();

  readonly form = new FormGroup<CheckoutForm>({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    shipping: this.shipping,
    billing: this.billing,
    sameAsShipping: new FormControl(false, { nonNullable: true }),
  });

  toggleSameAsShipping(): void {
    const checked = !this.form.controls.sameAsShipping.value;
    this.form.controls.sameAsShipping.setValue(checked, { emitEvent: false });
    if (checked) {
      this.billing.setValue(this.shipping.getRawValue(), { emitEvent: false });
      this.billing.disable({ emitEvent: false });
    } else {
      this.billing.enable({ emitEvent: false });
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
  }

  showError(control: FormControl<string>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  private createAddressGroup(): AddressGroup {
    return new FormGroup({
      street: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      zipcode: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
