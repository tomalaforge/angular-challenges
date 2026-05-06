import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { AddressModel } from '../checkout-form.model';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
  selector: 'app-address-form',
  templateUrl: 'address-form.component.html',
  styleUrls: ['address-form.component.scss'],
  imports: [FormField, ValidationMessageComponent],
})
export class AddressFormComponent {
  fieldTree = input.required<FieldTree<AddressModel>>();
}
