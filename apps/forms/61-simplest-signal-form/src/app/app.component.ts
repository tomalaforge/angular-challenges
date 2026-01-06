import { JsonPipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Simple Form</h1>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-700">
              Name
              <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Enter your name"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.name.invalid && !form.controls.name.untouched
              " />
            @if (form.controls.name.invalid && !form.controls.name.untouched) {
              <p class="mt-1 text-sm text-red-600">Name is required</p>
            }
          </div>

          <div>
            <label
              for="lastname"
              class="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              formControlName="lastname"
              placeholder="Enter your last name"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label
              for="age"
              class="mb-2 block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              formControlName="age"
              placeholder="Enter your age (1-99)"
              min="1"
              max="99"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.age.invalid && !form.controls.age.untouched
              " />
            @if (form.controls.age.invalid && !form.controls.age.untouched) {
              <p class="mt-1 text-sm text-red-600">
                @if (form.controls.age.hasError('min')) {
                  Age must be at least 1
                }
                @if (form.controls.age.hasError('max')) {
                  Age must be at most 99
                }
              </p>
            }
          </div>

          <div>
            <label
              for="note"
              class="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              id="note"
              type="text"
              formControlName="note"
              placeholder="Enter a note"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="form.invalid"
              class="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
              Submit
            </button>
            <button
              type="button"
              (click)="onReset()"
              class="flex-1 rounded-md bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-700">
              Reset
            </button>
          </div>
        </form>

        @if (submittedData()) {
          <div class="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
            <h2 class="mb-2 text-lg font-semibold text-green-900">
              Submitted Data:
            </h2>
            <pre
              class="overflow-x-auto rounded border border-green-200 bg-white p-4 text-sm"
              >{{ submittedData() | json }}</pre
            >
          </div>
        }
      </div>
    </div>
  `,
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastname: new FormControl('', { nonNullable: true }),
    age: new FormControl<number | null>(null, [
      Validators.min(1),
      Validators.max(99),
    ]),
    note: new FormControl('', { nonNullable: true }),
  });

  submittedData: WritableSignal<{
    name: string;
    lastname: string;
    age: number | null;
    note: string;
  } | null> = signal(null);

  onSubmit(): void {
    if (this.form.valid) {
      this.submittedData.set(this.form.getRawValue());
      console.log('Form submitted:', this.submittedData);
    }
  }

  onReset(): void {
    this.form.reset();
    this.submittedData.set(null);
  }
}
