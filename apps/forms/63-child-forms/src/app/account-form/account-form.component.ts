import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationComponent } from '../validation/validation.component';
import { AccountData } from './account-form.model';

@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  imports: [FormField, ValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent {
  public readonly form = input.required<FieldTree<AccountData>>();
}
