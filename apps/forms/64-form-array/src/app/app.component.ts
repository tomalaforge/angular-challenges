import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';

import {
  applyEach,
  email,
  form,
  FormField,
  FormRoot,
  required,
  SchemaPathTree,
  validate,
} from '@angular/forms/signals';

import { ContactFormComponent } from './contact-form.component';
import {
  ContactModel,
  EmailModel,
  RegistrationModel,
} from './registration.model';
import { ValidationMessageComponent } from './validation-message.component';

@Component({
  selector: 'app-root',
  imports: [
    FormRoot,
    FormField,
    JsonPipe,
    ContactFormComponent,
    ValidationMessageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styles: [
    `
      @reference "tailwindcss";

      .input {
        @apply w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200;
      }
      .hint {
        @apply text-xs text-rose-600;
      }
      .btn-primary {
        @apply rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-300;
      }
      .btn-secondary {
        @apply rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600;
      }
      .btn-danger {
        @apply rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:text-rose-700;
      }
    `,
  ],
})
export class AppComponent {
  submittedData: WritableSignal<RegistrationModel | null> = signal(null);

  model = signal<RegistrationModel>({
    name: '',
    pseudo: '',
    contacts: [],
    emails: [],
  });

  form = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.name, { message: 'This field is required' });
      required(schemaPath.pseudo, { message: 'This field is required' });
      applyEach(schemaPath.contacts, (item: SchemaPathTree<ContactModel>) => {
        required(item.firstname, { message: 'This field is required' });
        required(item.lastname, { message: 'This field is required' });
        required(item.relation, { message: 'This field is required' });
        required(item.email, { message: 'email is required' });
        email(item.email, { message: 'Enter a valid email' });
      });
      validate(schemaPath.contacts, ({ value }) => {
        if (value().length > 0) {
          return null;
        }

        return {
          kind: 'minLengthArray',
          message: 'At least one contact is required',
        };
      });
      applyEach(schemaPath.emails, (item: SchemaPathTree<EmailModel>) => {
        required(item.type, { message: 'This field is required' });
        required(item.email, { message: 'email is required' });
        email(item.email, { message: 'Enter a valid email' });
      });
    },
    {
      submission: {
        action: async () => {
          this.submittedData.set(this.model());
        },
      },
    },
  );

  addContact(): void {
    const newContact: ContactModel = {
      firstname: '',
      lastname: '',
      relation: '',
      email: '',
    };

    this.model.update((m) => {
      return {
        ...m,
        contacts: [...m.contacts, newContact],
      };
    });
  }

  removeContact(index: number): void {
    this.model.update((m) => {
      const updatedContacts = [...m.contacts];
      updatedContacts.splice(index, 1);
      return {
        ...m,
        contacts: updatedContacts,
      };
    });
  }

  addEmail(): void {
    const newEmail = {
      type: 'personal',
      email: '',
    };
    this.model.update((m) => {
      return {
        ...m,
        emails: [...m.emails, newEmail],
      };
    });
  }

  removeEmail(index: number): void {
    this.model.update((m) => {
      const updatedEmails = [...m.emails];
      updatedEmails.splice(index, 1);
      return {
        ...m,
        emails: updatedEmails,
      };
    });
  }

  onSubmit(): void {
    // this.form.markAllAsTouched();
    // if (this.form.invalid) {
    //   return;
    // }
    // this.submittedData.set(this.form.getRawValue());
  }

  // showError(control: FormControl<string>): boolean {
  //   return control.invalid && (control.touched || control.dirty);
  // }

  // private createContactGroup(): ContactFormGroup {
  //   return new FormGroup({
  //     firstname: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required],
  //     }),
  //     lastname: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required],
  //     }),
  //     relation: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required],
  //     }),
  //     email: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.email],
  //     }),
  //   });
  // }

  // private createEmailFormGroup(): EmailFormGroup {
  //   return new FormGroup({
  //     type: new FormControl('personal', {
  //       nonNullable: true,
  //       validators: [Validators.required],
  //     }),
  //     email: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.email],
  //     }),
  //   });
  // }
}
