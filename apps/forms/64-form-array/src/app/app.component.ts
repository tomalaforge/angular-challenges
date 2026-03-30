import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import {
  cEmail,
  cMinLength,
  cRequired,
  insertForm,
  insertFormAttributes,
  insertFormSubmit,
  insertNoopTypingAnchor,
  insertSelectFormTree,
  mutation,
  state,
  ValidatedFormValue,
} from '@craft-ng/core';
import { ContactFormComponent } from './contact-form.component';

type Contact = {
  firstname: string;
  lastname: string;
  relation: string;
  email: string;
};

type Email = {
  type: string;
  email: string;
};

type Registration = {
  name: string;
  pseudo: string;
  contacts: Contact[];
  emails: Email[];
};

// 😅 I may add some helpers
export type ContactField = ReturnType<
  ReturnType<
    ReturnType<
      ReturnType<
        InstanceType<typeof AppComponent>['registration']['form']
      >['selectContacts']
    >
  >['items']
>[number];

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe, ContactFormComponent, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-slate-50 text-slate-900">
      <div class="mx-auto max-w-5xl px-6 py-12">
        <h1 class="mb-6 text-3xl font-semibold">Registration form</h1>
        @let form = registration.form();
        <form
          class="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <section class="space-y-4">
            <h2 class="text-xl font-semibold">Profile</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              @let nameField = form.selectName();
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Name
                <input class="input" type="text" [formField]="nameField" />
                <span class="hint">
                  @for( exception of nameField().visibleExceptions().list; track exception.code) {
                    @switch(exception.code) {
                      @case('required') {
                        Name is required
                      }
                      @default never;
                    }
                  }
                </span>
              </label>
              @let pseudoField = form.selectPseudo();
              <label
                class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Pseudo
                <input
                  class="input"
                  type="text"
                  [formField]="pseudoField" />
                <span class="hint">
                  @for( exception of pseudoField().visibleExceptions().list; track exception.code) {
                    @switch(exception.code) {
                      @case('required') {
                        This field is required
                      }
                      @default never;
                    }
                  }
                </span>
              </label>
            </div>
          </section>

          <section class="space-y-4">
            @let contacts = form.selectContacts();
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Contacts</h2>
              <button
                type="button"
                (click)="contacts().add()"
                class="btn-secondary">
                Add contact
              </button>
            </div>

            <div  class="space-y-4">
              @for (contact of contacts().items(); track $index) {
                <app-contact-form
                  [field]="contact"
                  [index]="$index"
                  (remove)="contacts().remove($index)"></app-contact-form>
              }
            </div>
            @for( exception of contacts().visibleExceptions().list; track exception.code) {
              @let code = exception.code;
              @switch(code) {
                @case('minLength') {
                  <p class="hint">At least one contact is required.</p>
                }
                @default never;
              }
            }
          </section>

          <section class="space-y-4">
             @let emails = form.selectEmails();
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold">Emails</h2>
              <button type="button" (click)="emails().add()" class="btn-secondary">
                Add email
              </button>
            </div>

            <div class="space-y-4">
              @for (email of emails().items(); track $index) {
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
                      (click)="emails().remove($index)">
                      Remove
                    </button>
                  </div>

                  <div
                    class="mt-4 grid gap-4 sm:grid-cols-2">
                    @let relativeField = email().selectType();
                    <label
                      class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Type
                      <select class="input" [formField]="relativeField">
                        <option value="personal">Personal</option>
                        <option value="professional">Professional</option>
                        <option value="other">Other</option>
                      </select>
                      @for(exceptions of relativeField().visibleExceptions().list; track exceptions.code) {
                        @switch(exceptions.code) {
                          @case('required') {
                            <span class="hint">This field is required</span>
                          }
                          @default never;
                        }
                      }
                    </label>
                    @let emailField = email().selectEmail();
                    <label
                      class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                      Email
                      <input
                        class="input"
                        type="email"
                        [formField]="emailField" />
                        @for(exceptions of emailField().visibleExceptions().list; track exceptions.code) {
                          @let code= exceptions.code;
                          @switch(code) {
                            @case('required') {
                              <span class="hint">Email is required</span>
                            }
                            @case('email') {
                              <span class="hint">Enter a valid email</span>
                            }
                            @default never;
                          }
                        }
                    </label>
                  </div>
                </div>
              }
            </div>
          </section>

          <div
            class="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
            <div class="text-sm text-slate-600">
              <span [class.text-rose-600]="registration.form().invalid()">
                {{ registration.form().invalid() ? 'Form incomplete' : 'Ready to submit' }}
              </span>
            </div>
            <button type='button' (click)="registration.form().submit()" class="btn-primary">Submit</button>
          </div>
        </form>

        @if (save.safeValue()) {
          <section
            class="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 class="mb-2 text-lg font-semibold">Submitted data</h3>
            <pre
              class="overflow-x-auto rounded bg-slate-900 p-4 text-sm text-slate-100"
              >{{ save.safeValue() | json }}</pre
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
  protected readonly save = mutation({
    method: (registration: ValidatedFormValue<Registration>) => registration,
    loader: async ({ params: registration }) => registration,
  });

  readonly registration = state(
    {
      name: '',
      pseudo: '',
      contacts: [],
      emails: [],
    } satisfies Registration as Registration,
    insertForm(
      insertFormSubmit(this.save),
      insertSelectFormTree(
        'name',
        insertNoopTypingAnchor,
        insertFormAttributes(() => ({ validators: [cRequired()] })),
      ),
      insertSelectFormTree(
        'pseudo',
        insertNoopTypingAnchor,
        insertFormAttributes(() => ({ validators: [cRequired()] })),
      ),
      insertSelectFormTree(
        'contacts',
        insertNoopTypingAnchor,
        ({ update }) => ({
          add: () =>
            update((contacts) => [
              ...contacts,
              { firstname: '', lastname: '', relation: '', email: '' },
            ]),
          remove: (index: number) =>
            update((contacts) => contacts.filter((_, i) => i !== index)),
        }),
        insertFormAttributes(() => ({
          validators: [cMinLength({ minLength: 1 })],
        })),
        insertSelectFormTree(
          'contact',
          insertSelectFormTree(
            'firstname',
            insertNoopTypingAnchor,
            insertFormAttributes(() => ({
              validators: [cRequired()],
            })),
          ),
          insertSelectFormTree(
            'lastname',
            insertNoopTypingAnchor,
            insertFormAttributes(() => ({
              validators: [cRequired()],
            })),
          ),
          insertSelectFormTree(
            'email',
            insertNoopTypingAnchor,
            insertFormAttributes(() => ({
              validators: [cRequired(), cEmail()],
            })),
          ),
          insertSelectFormTree(
            'relation',
            insertNoopTypingAnchor,
            insertFormAttributes(() => ({
              validators: [cRequired()],
            })),
          ),
        ),
      ),
      insertSelectFormTree(
        'emails',
        ({ update }) => ({
          add: () =>
            update((emails) => [...emails, { email: '', type: 'personal' }]),
          remove: (index: number) =>
            update((contacts) => contacts.filter((_, i) => i !== index)),
        }),
        insertSelectFormTree(
          'email',
          insertNoopTypingAnchor,
          insertSelectFormTree(
            'email',
            insertNoopTypingAnchor,
            insertFormAttributes(() => ({
              validators: [cRequired(), cEmail()],
            })),
          ),
          insertSelectFormTree(
            'type',
            insertNoopTypingAnchor,
            insertFormAttributes(() => ({
              validators: [cRequired()],
            })),
          ),
        ),
      ),
    ),
  );
}
