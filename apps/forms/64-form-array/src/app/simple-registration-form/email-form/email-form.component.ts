import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationComponent } from '../../validation/validation.component';
import { EmailValue } from './email-form.model';

@Component({
  selector: 'app-email-form-with-input-form',
  imports: [ValidationComponent, FormField],
  templateUrl: './email-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFormWithInputFormComponent {
  public readonly emailForm = input.required<FieldTree<EmailValue>>();
  index = input(0);
  remove = output<void>();
}
