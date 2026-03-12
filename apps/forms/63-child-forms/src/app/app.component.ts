import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { disabled, form, FormField, FormRoot } from '@angular/forms/signals';
import { AccountFormComponent } from './account-form/account-form.component';
import {
  AccountData,
  buildAccountSection,
  createAccountModel,
} from './account-form/account-form.model';
import { AddressFormComponent } from './address-form/address-form.component';
import {
  AddressData,
  buildAddressSection,
  createAddressModel,
} from './address-form/address-form.model';

type CheckoutData = {
  account: AccountData;
  shipping: AddressData;
  billing: AddressData;
  sameAsShipping: boolean;
};

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormRoot,
    FormField,
    AccountFormComponent,
    AddressFormComponent,
    FormField,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _initialData: CheckoutData = {
    account: createAccountModel()(),
    shipping: createAddressModel()(),
    billing: createAddressModel()(),
    sameAsShipping: false,
  };
  private _checkoutModel = signal<CheckoutData>(this._initialData);
  private _onSameAsShippingChange = effect(() => {
    const sameAsShipping = this.checkoutForm.sameAsShipping().value();

    if (sameAsShipping) {
      untracked(() => {
        this.checkoutForm
          .billing()
          .value.set(this.checkoutForm.shipping().value());
      });
    }
  });

  protected checkoutForm = form(
    this._checkoutModel,
    (schemaPath) => {
      buildAccountSection(schemaPath.account);
      buildAddressSection(schemaPath.shipping);
      buildAddressSection(schemaPath.billing);
      disabled(schemaPath.billing, ({ valueOf }) =>
        valueOf(schemaPath.sameAsShipping),
      );
    },
    {
      submission: {
        action: async () => {
          if (this.checkoutForm().invalid()) {
            return;
          }
        },
      },
    },
  );
}
