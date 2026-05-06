import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';

import {
  disabled,
  form,
  FormField,
  FormRoot,
  hidden,
  required,
} from '@angular/forms/signals';
import { AddressFormComponent } from './address-form/address-form.component';
import { CheckoutModel, initialCheckoutModel } from './checkout-form.model';
import { ValidationMessageComponent } from './validation-message/validation-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormRoot,
    FormField,
    AddressFormComponent,
    ValidationMessageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  checkoutModel = signal<CheckoutModel>(initialCheckoutModel);

  checkoutForm = form(
    this.checkoutModel,
    (schema) => {
      required(schema.firstName, { message: 'This field is required' });
      required(schema.lastName, { message: 'This field is required' });
      required(schema.shipping.street, { message: 'This field is required' });
      required(schema.shipping.zipcode, { message: 'This field is required' });
      required(schema.shipping.city, { message: 'This field is required' });
      required(schema.billing.street, { message: 'This field is required' });
      required(schema.billing.zipcode, { message: 'This field is required' });
      required(schema.billing.city, { message: 'This field is required' });

      disabled(schema.billing, ({ valueOf }) => valueOf(schema.sameAsShipping));
      hidden(schema.billing, ({ valueOf }) => valueOf(schema.sameAsShipping));
    },
    {
      submission: {
        action: async () => {
          console.log('Form submitted with value:', this.checkoutModel());
        },
      },
    },
  );

  sameAsShipping = computed(() => this.checkoutModel().sameAsShipping);
  shippingAddress = computed(() => this.checkoutModel().shipping);

  constructor() {
    effect(() => {
      if (this.sameAsShipping()) {
        this.checkoutModel.update((model) => {
          return {
            ...model,
            billing: { ...this.shippingAddress() },
          };
        });
      }
    });
  }
}
