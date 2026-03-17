import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ValidationComponent } from '../../validation/validation.component';
import { ContactValue } from './contact-form.model';

@Component({
  selector: 'app-contact-form-with-input-form',
  imports: [ValidationComponent, FormField],
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormWithInputFormComponent {
  public readonly contactForm = input.required<FieldTree<ContactValue>>();
  index = input(0);
  remove = output<void>();
}
