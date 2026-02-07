import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormField,
  email,
  form,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';

interface IFormValue {
  email: string;
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-root',
  imports: [FormField, JsonPipe],
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Registration Form</h1>
        <p class="mb-6 text-sm text-gray-600">
          This form demonstrates cross field validation with reactive forms
        </p>

        <form (submit)="onSubmit($event)" class="space-y-6">
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-700">
              Email
              <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              [formField]="form.email"
              placeholder="Enter your email"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.email().invalid() && form.email().touched()
              " />
            @if (form.email().invalid() && form.email().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @for (error of form.email().errors(); track error) {
                  {{ error.message }}
                }
              </p>
            }
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-700">
              Password
              <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              [formField]="form.password"
              placeholder="Enter your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.password().invalid() && form.password().touched()
              " />
            @if (form.password().invalid() && form.password().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @for (error of form.password().errors(); track error) {
                  {{ error.message }}
                }
              </p>
            }
          </div>

          <div>
            <label
              for="confirmPassword"
              class="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
              <span class="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              [formField]="form.confirmPassword"
              placeholder="Confirm your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.confirmPassword().invalid() &&
                form.confirmPassword().touched()
              " />
            @if (
              form.confirmPassword().invalid() &&
              form.confirmPassword().touched()
            ) {
              <p class="mt-1 text-sm text-red-600">
                @for (error of form.confirmPassword().errors(); track error) {
                  {{ error.message }}
                }
              </p>
            }
          </div>

          <div>
            <label
              for="startDate"
              class="mb-2 block text-sm font-medium text-gray-700">
              Start Date
              <span class="text-red-500">*</span>
            </label>
            <input
              id="startDate"
              type="date"
              [formField]="form.startDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.startDate().invalid() && form.startDate().touched()
              " />
            @if (form.startDate().invalid() && form.startDate().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @for (error of form.startDate().errors(); track error) {
                  {{ error.message }}
                }
              </p>
            }
          </div>

          <div>
            <label
              for="endDate"
              class="mb-2 block text-sm font-medium text-gray-700">
              End Date
              <span class="text-red-500">*</span>
            </label>
            <input
              id="endDate"
              type="date"
              [formField]="form.endDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.endDate().invalid() && form.endDate().touched()
              " />
            @if (form.endDate().invalid() && form.endDate().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @for (error of form.endDate().errors(); track error) {
                  {{ error.message }}
                }
              </p>
            }
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="form().invalid()"
              class="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
              Submit
            </button>
            <button
              type="button"
              (click)="onReset()"
              class="flex-1 rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-400">
              Reset
            </button>
          </div>
        </form>

        <div class="mt-8 rounded-md bg-gray-50 p-4">
          <h2 class="mb-2 text-lg font-semibold text-gray-900">Form Status</h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Valid:</span>
              <span
                [class.text-green-600]="form().valid()"
                [class.text-red-600]="form().invalid()">
                {{ form().valid() ? 'Yes' : 'No' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Touched:</span>
              <span>{{ form().touched() ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Dirty:</span>
              <span>{{ form().dirty() ? 'Yes' : 'No' }}</span>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="mb-2 font-medium text-gray-700">Form Value:</h3>
            <pre
              class="overflow-x-auto rounded bg-gray-800 p-3 text-xs text-gray-100"
              >{{ form().value() | json }}</pre
            >
          </div>
        </div>

        @if (isSubmitted()) {
          <div class="mt-6 rounded-md border border-green-300 bg-green-50 p-4">
            <h2 class="mb-2 text-lg font-semibold text-green-900">
              Form Submitted Successfully!
            </h2>
            <pre
              class="overflow-x-auto rounded bg-green-800 p-3 text-xs text-green-100"
              >{{ form().value() | json }}</pre
            >
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isSubmitted = signal(false);

  formDefaultValue: IFormValue = {
    email: '',
    password: '',
    confirmPassword: '',
    startDate: '',
    endDate: '',
  };

  formModel = signal<IFormValue>(this.formDefaultValue);

  form = form(this.formModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email address' });

    required(path.password, { message: 'Password is required' });
    minLength(path.password, 6, {
      message: 'Password must be at least 6 characters',
    });

    required(path.confirmPassword, { message: 'Please confirm your password' });
    validate(path.confirmPassword, ({ value, valueOf }) =>
      value() !== valueOf(path.password)
        ? {
            kind: 'passwordMismatch',
            message: 'Passwords do not match',
          }
        : null,
    );

    required(path.startDate, { message: 'Start date is required' });

    required(path.endDate, { message: 'End date is required' });
    validate(path.endDate, ({ value, valueOf }) => {
      const startDate = valueOf(path.startDate);
      const endDate = value();
      if (!startDate || !endDate) {
        return null;
      }
      return new Date(startDate) > new Date(endDate)
        ? {
            kind: 'endDateBeforeStart',
            message: 'End date must be after start date',
          }
        : null;
    });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('Submitting form...', this.form());
    if (this.form().valid()) {
      this.isSubmitted.set(true);
      console.log('Form submitted:', this.form().value());
    }
  }

  onReset() {
    this.formModel.set(this.formDefaultValue);
    this.isSubmitted.set(false);
  }
}
