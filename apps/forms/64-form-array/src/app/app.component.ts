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
import { Contact, Email, Registration } from './types';

function ContactSchema(item: SchemaPathTree<Contact>) {
  required(item.firstName, { message: 'This field is required' });
  required(item.lastname, { message: 'This field is required' });
  required(item.relation, { message: 'This field is required' });
  required(item.email, { message: 'Email is required' });
  email(item.email, { message: 'Enter a valid email' });
}

function EmailSchema(item: SchemaPathTree<Email>) {
  required(item.type, { message: 'This field is required' });
  required(item.email, { message: 'Email is required' });
  email(item.email, { message: 'Enter a valid email' });
}

@Component({
  selector: 'app-root',
  imports: [JsonPipe, ContactFormComponent, FormField, FormRoot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-slate-50 text-slate-900">
      <div class="mx-auto max-w-5xl px-6 py-12">
        <h1 class="mb-6 text-3xl font-semibold">Registration form</h1>
        <form
          [formRoot]="registrationForm"
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
                  [formField]="registrationForm.name" />
                <span class="hint">
                  @if (
                    registrationForm.name().invalid() &&
                    (registrationForm.name().touched() ||
                      registrationForm.name().dirty())
                  ) {
                    {{ registrationForm.name().errors()[0].message }}
                  }
                </span>
              </label>
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Pseudo
                <input
                  class="input"
                  type="text"
                  [formField]="registrationForm.pseudo" />
                <span class="hint">
                  @if (
                    registrationForm.pseudo().invalid() &&
                    (registrationForm.pseudo().touched() ||
                      registrationForm.pseudo().dirty())
                  ) {
                    {{ registrationForm.pseudo().errors()[0]?.message }}
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

            <div class="space-y-4">
              @for (contact of registrationForm.contacts; track contact) {
                <app-contact-form
                  [group]="contact"
                  [index]="$index"
                  (remove)="removeContact($index)"></app-contact-form>
              }
            </div>

            @if (
              registrationForm.contacts().invalid() &&
              (registrationForm.contacts().touched() ||
                registrationForm.contacts().dirty())
            ) {
              <p class="hint">
                {{ registrationForm.contacts().errors()[0]?.message }}
              </p>
            }
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Emails</h2>
              <button type="button" (click)="addEmail()" class="btn-secondary">
                Add email
              </button>
            </div>

            <div class="space-y-4">
              @for (emailField of registrationForm.emails; track emailField) {
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

                  <div class="mt-4 grid gap-4 sm:grid-cols-2">
                    <label
                      class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Type
                      <select class="input" [formField]="emailField.type">
                        <option value="personal">Personal</option>
                        <option value="professional">Professional</option>
                        <option value="other">Other</option>
                      </select>
                      <span class="hint">
                        @if (
                          emailField.type().invalid() &&
                          (emailField.type().touched() ||
                            emailField.type().dirty())
                        ) {
                          {{ emailField.type().errors()[0]?.message }}
                        }
                      </span>
                    </label>

                    <label
                      class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Email
                      <input
                        class="input"
                        type="email"
                        [formField]="emailField.email" />
                      <span class="hint">
                        @if (
                          emailField.email().invalid() &&
                          (emailField.email().touched() ||
                            emailField.email().dirty())
                        ) {
                          @for (
                            err of emailField.email().errors();
                            track err.kind
                          ) {
                            {{ err.message }}
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
              <span [class.text-rose-600]="registrationForm().invalid()">
                {{
                  registrationForm().invalid()
                    ? 'Form incomplete'
                    : 'Ready to submit'
                }}
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
  readonly formModel = signal<Registration>({
    name: '',
    pseudo: '',
    contacts: [],
    emails: [],
  });

  readonly registrationForm = form(
    this.formModel,
    (schemePath) => {
      required(schemePath.name, { message: 'This field is required' });
      required(schemePath.pseudo, { message: 'This field is required' });

      applyEach(schemePath.contacts, ContactSchema);
      applyEach(schemePath.emails, EmailSchema);

      validate(schemePath.contacts, ({ value }) => {
        if (value().length >= 1) return null;

        return {
          kind: 'MinLengthArray',
          message: 'At least one contact is required.',
        };
      });
    },
    {
      submission: {
        action: async () => {
          return this.submittedData.set(this.formModel());
        },
      },
    },
  );

  submittedData: WritableSignal<Registration | null> = signal(null);

  addContact(): void {
    this.formModel.update((model) => ({
      ...model,
      contacts: [
        ...model.contacts,
        { firstName: '', lastname: '', relation: '', email: '' },
      ],
    }));
  }

  removeContact(index: number): void {
    this.formModel.update((model) => ({
      ...model,
      contacts: [
        ...model.contacts.slice(0, index),
        ...model.contacts.slice(index + 1),
      ],
    }));
  }

  addEmail(): void {
    this.formModel.update((model) => ({
      ...model,
      emails: [...model.emails, { type: 'personal', email: '' }],
    }));
  }

  removeEmail(index: number): void {
    this.formModel.update((model) => ({
      ...model,
      emails: [
        ...model.emails.slice(0, index),
        ...model.emails.slice(index + 1),
      ],
    }));
  }
}
