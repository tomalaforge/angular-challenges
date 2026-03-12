import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationComponent } from '../validation/validation.component';
import { AddressData } from './address-form.model';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  imports: [FormField, ValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent {
  public readonly form = input.required<FieldTree<AddressData>>();
}
