import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="sr-only" for="name">Name</label>
        <input
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Name"
          type="text"
          formControlName="name"
          id="name" />
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="sr-only" for="email">Email</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Email address"
            type="email"
            formControlName="email"
            id="email" />
        </div>

        <div>
          <label class="sr-only" for="phone">Phone</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Phone Number"
            type="tel"
            formControlName="phone"
            id="phone" />
        </div>
      </div>

      <div>
        <label class="sr-only" for="message">Message</label>

        <textarea
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Message"
          rows="8"
          formControlName="message"
          id="message"></textarea>
      </div>

      <div class="mt-4">
        <button
          (keyup.enter)="onSubmit()"
          [disabled]="form.invalid"
          type="submit"
          class="inline-block w-full rounded-lg border bg-gray-50 px-5 py-3 font-medium text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto">
          Submit
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  hasValues = output<boolean>();

  #fb = inject(FormBuilder);

  form = this.#fb.nonNullable.group({
    name: ['', { validators: [Validators.required] }],
    email: ['', [Validators.required, Validators.email]], // other syntax
    phone: '',
    message: '',
  });

  constructor() {
    this.form.statusChanges
      .pipe(
        map((form) => Object.values(form)),
        map((values) => values.map((v) => v.trim()).some((v) => v.length)),
        distinctUntilChanged(),
        tap((hasValues) => this.hasValues.emit(hasValues)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.reset();
      alert('Form submitted!');
    }
  }
}
