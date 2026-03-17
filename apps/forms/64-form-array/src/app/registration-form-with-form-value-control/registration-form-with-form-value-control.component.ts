import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  applyEach,
  form,
  FormField,
  FormRoot,
  required,
  validate,
} from '@angular/forms/signals';
import { ValidationComponent } from '../validation/validation.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import {
  contactSchema,
  ContactValue,
  initialContactValue,
} from './contact-form/contact-form.model';
import { EmailFormComponent } from './email-form/email-form.component';
import { emailSchema, initialEmailValue } from './email-form/email-form.model';

type RegistrationValue = {
  name: string;
  pseudo: string;
  contacts: Array<ContactValue>;
  emails: Array<{
    type: string;
    email: string;
  }>;
};

type RegistrationData = {
  name: string;
  pseudo: string;
  contacts: Array<ContactValue>;
  emails: Array<{
    type: string;
    email: string;
  }>;
};

@Component({
  selector: 'app-registration-form-with-form-value-control',
  templateUrl: './registration-form-with-form-value-control.component.html',
  imports: [
    JsonPipe,
    ContactFormComponent,
    FormRoot,
    FormField,
    ValidationComponent,
    EmailFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistrationFormWithFormValueControlComponent {
  private readonly _initialData: RegistrationData = {
    name: '',
    pseudo: '',
    contacts: [],
    emails: [],
  };
  private _registrationModel = signal<RegistrationData>(this._initialData);

  protected registrationForm = form<RegistrationData>(
    this._registrationModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'This field is required' });
      required(schemaPath.pseudo, { message: 'This field is required' });
      validate(schemaPath.contacts, ({ value }) => {
        if (value().length < 1) {
          return {
            kind: 'minLength',
            message: 'At least one contact is required',
          };
        }
        return null;
      });
      applyEach(schemaPath.contacts, contactSchema);
      applyEach(schemaPath.emails, emailSchema);
    },
    {
      submission: {
        action: async () => {
          if (this.registrationForm().invalid()) {
            return;
          }

          this.submittedData.set(this.registrationForm().value());
        },
      },
    },
  );

  submittedData: WritableSignal<RegistrationValue | null> = signal(null);

  addContact(): void {
    this._registrationModel.update((value) => ({
      ...value,
      contacts: [...value.contacts, { ...initialContactValue }],
    }));
  }

  removeContact(index: number): void {
    this._registrationModel.update((value) => ({
      ...value,
      contacts: value.contacts.filter((_, i) => i !== index),
    }));
  }

  addEmail(): void {
    this._registrationModel.update((value) => ({
      ...value,
      emails: [...value.emails, { ...initialEmailValue }],
    }));
  }

  removeEmail(index: number): void {
    this._registrationModel.update((value) => ({
      ...value,
      emails: value.emails.filter((_, i) => i !== index),
    }));
  }
}
