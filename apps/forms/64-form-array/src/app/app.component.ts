import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';

type ContactFormGroup = FormGroup<{
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  relation: FormControl<string>;
  email: FormControl<string>;
}>;

type EmailFormGroup = FormGroup<{
  type: FormControl<string>;
  email: FormControl<string>;
}>;

type RegistrationForm = {
  name: FormControl<string>;
  pseudo: FormControl<string>;
  contacts: FormArray<ContactFormGroup>;
  emails: FormArray<EmailFormGroup>;
};

type RegistrationValue = {
  name: string;
  pseudo: string;
  contacts: Array<{
    firstname: string;
    lastname: string;
    relation: string;
    email: string;
  }>;
  emails: Array<{
    type: string;
    email: string;
  }>;
};

export const minLengthArray = (min: number) => {
  return (c: AbstractControl) => {
    if (c.value.length >= min) return null;

    return { MinLengthArray: true };
  };
};

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe, ContactFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-slate-50 text-slate-900">
      <div class="mx-auto max-w-5xl px-6 py-12">
        <h1 class="mb-6 text-3xl font-semibold">Registration form</h1>
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Profile</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Name
                <input
                  class="input"
                  type="text"
                  formControlName="name"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(form.controls.name)) {
                    This field is required
                  }
                </span>
              </label>
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Pseudo
                <input
                  class="input"
                  type="text"
                  formControlName="pseudo"
                  required
                  aria-required="true" />
                <span class="hint">
                  @if (showError(form.controls.pseudo)) {
                    This field is required
                  }
                </span>
              </label>
            </div>
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Contacts</h2>
              <button
                type="button"
                (click)="addContact()"
                class="btn-secondary">
                Add contact
              </button>
            </div>

            <div formArrayName="contacts" class="space-y-4">
              @for (contact of contacts.controls; track $index) {
                <app-contact-form
                  [group]="contact"
                  [index]="$index"
                  (remove)="removeContact($index)"></app-contact-form>
              }
            </div>

            @if (contacts.invalid && (contacts.touched || contacts.dirty)) {
              <p class="hint">At least one contact is required.</p>
            }
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Emails</h2>
              <button type="button" (click)="addEmail()" class="btn-secondary">
                Add email
              </button>
            </div>

            <div formArrayName="emails" class="space-y-4">
              @for (email of emails.controls; track $index) {
                <div
                  class="rounded-lg border border-slate-200 bg-slate-50/40 p-4"
                  data-testid="email-item">
                  <div class="flex items-center justify-between gap-4">
                    <h3 class="text-sm font-semibold text-slate-700">
                      Email {{ $index + 1 }}
                    </h3>
                    <button
                      type="button"
                      class="btn-danger"
                      aria-label="Remove email {{ $index + 1 }}"
                      (click)="removeEmail($index)">
                      Remove
                    </button>
                  </div>

                  <div
                    class="mt-4 grid gap-4 sm:grid-cols-2"
                    [formGroupName]="$index">
                    <label
                      class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Type
                      <select class="input" formControlName="type">
                        <option value="personal">Personal</option>
                        <option value="professional">Professional</option>
                        <option value="other">Other</option>
                      </select>
                      <span class="hint">
                        @if (showError(email.controls.type)) {
                          This field is required
                        }
                      </span>
                    </label>
                    <label
                      class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Email
                      <input
                        class="input"
                        type="email"
                        formControlName="email"
                        required
                        aria-required="true" />
                      <span class="hint">
                        @if (showError(email.controls.email)) {
                          @if (email.controls.email.hasError('required')) {
                            Email is required
                          }
                          @if (email.controls.email.hasError('email')) {
                            Enter a valid email
                          }
                        }
                      </span>
                    </label>
                  </div>
                </div>
              }
            </div>
          </section>

          <div
            class="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
            <div class="text-sm text-slate-600">
              <span [class.text-rose-600]="form.invalid">
                {{ form.invalid ? 'Form incomplete' : 'Ready to submit' }}
              </span>
            </div>
            <button type="submit" class="btn-primary">Submit</button>
          </div>
        </form>

        @if (submittedData()) {
          <section
            class="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 class="mb-2 text-lg font-semibold">Submitted data</h3>
            <pre
              class="overflow-x-auto rounded bg-slate-900 p-4 text-sm text-slate-100"
              >{{ submittedData() | json }}</pre
            >
          </section>
        }
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
      .btn-primary {
        @apply rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300;
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
  readonly contacts = new FormArray<ContactFormGroup>([], {
    validators: [minLengthArray(1)],
  });

  readonly emails = new FormArray<EmailFormGroup>([]);

  readonly form = new FormGroup<RegistrationForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    pseudo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    contacts: this.contacts,
    emails: this.emails,
  });

  submittedData: WritableSignal<RegistrationValue | null> = signal(null);

  addContact(): void {
    this.contacts.push(this.createContactGroup());
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  addEmail(): void {
    this.emails.push(this.createEmailFormGroup());
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.submittedData.set(this.form.getRawValue());
  }

  showError(control: FormControl<string>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  private createContactGroup(): ContactFormGroup {
    return new FormGroup({
      firstname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      relation: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  private createEmailFormGroup(): EmailFormGroup {
    return new FormGroup({
      type: new FormControl('personal', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
    });
  }
}
