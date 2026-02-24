import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

type ContactFormGroup = FormGroup<{
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  relation: FormControl<string>;
  email: FormControl<string>;
}>;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="rounded-lg border border-slate-200 bg-slate-50/40 p-4"
      data-testid="contact-item"
      [formGroup]="group()">
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
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          First name
          <input
            class="input"
            type="text"
            formControlName="firstname"
            required
            aria-required="true" />
          <span class="hint">
            @if (showError(group().controls.firstname)) {
              This field is required
            }
          </span>
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Last name
          <input
            class="input"
            type="text"
            formControlName="lastname"
            required
            aria-required="true" />
          <span class="hint">
            @if (showError(group().controls.lastname)) {
              This field is required
            }
          </span>
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Relation
          <input
            class="input"
            type="text"
            formControlName="relation"
            required
            aria-required="true" />
          <span class="hint">
            @if (showError(group().controls.relation)) {
              This field is required
            }
          </span>
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email
          <input
            class="input"
            type="email"
            formControlName="email"
            required
            aria-required="true" />
          <span class="hint">
            @if (showError(group().controls.email)) {
              @if (group().controls.email.hasError('required')) {
                Email is required
              }
              @if (group().controls.email.hasError('email')) {
                Enter a valid email
              }
            }
          </span>
        </label>
      </div>
    </div>
  `,
})
export class ContactFormComponent {
  group = input.required<ContactFormGroup>();
  index = input(0);
  remove = output<void>();

  showError(control: FormControl<string>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }
}
