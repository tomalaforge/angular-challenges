import { Component, input, output } from '@angular/core';
import { CraftFieldDirective } from '@craft-ng/core';
import { ContactFormTree } from './app.component';
@Component({
  selector: 'app-contact-form',
  imports: [CraftFieldDirective],
  template: `
    <div
      class="rounded-lg border border-slate-200 bg-slate-50/40 p-4"
      data-testid="contact-item">
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-sm font-semibold text-slate-700">
          Contact {{ index() + 1 }}
        </h3>
        <button
          type="button"
          class="btn-danger"
          aria-label="Remove contact {{ index() + 1 }}"
          (click)="remove.emit()">
          Remove
        </button>
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        @let firstNameField = this.field().selectFirstname();
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          First name
          <input class="input" type="text" [craftField]="firstNameField" />
          @for (
            exception of firstNameField.visibleExceptions().list;
            track exception.code
          ) {
            <span class="hint">
              @switch (exception.code) {
                @case('required') {
                  First name is required
                }
                @default never;
              }
            </span>
          }
        </label>
        @let lastNameField = this.field().selectLastname();
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Last name
          <input
            class="input"
            type="text"
            [craftField]="lastNameField" />
          <span class="hint">
            @for (
              exception of lastNameField.visibleExceptions().list;
              track exception.code
            ) {
              @switch (exception.code) {
                @case('required') {
                  Last name is required
                }
                @default never;
              }
            }
          </span>
        </label>
        @let relationField = this.field().selectRelation();
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Relation
          <input
            class="input"
            type="text"
            [craftField]="relationField" />
          <span class="hint">
            @for (
              exception of relationField.visibleExceptions().list;
              track exception.code
            ) {
              @switch (exception.code) {
                @case('required') {
                  Relation is required
                }
                @default never;
              }
            }
          </span>
        </label>
        @let emailField = this.field().selectEmail();
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email
          <input
            class="input"
            type="email"
            [craftField]="emailField" />
          <span class="hint">
            @for (
              exception of emailField.visibleExceptions().list;
              track exception.code
            ) {
              @let code = exception.code;
              @switch (code) {
                @case('required') {
                  Email is required
                }
                @case('email') {
                  Enter a valid email
                }
                @default never;
              }
            }
          </span>
        </label>
      </div>
    </div>
  `,
})
export class ContactFormComponent {
  field = input.required<ContactFormTree>();
  index = input(0);
  remove = output<void>();
}
