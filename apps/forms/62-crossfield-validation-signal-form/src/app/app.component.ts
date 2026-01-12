import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    if (!form) {
      return null;
    }

    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if (!confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      form.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    }

    return null;
  };
}

function endDateAfterStartDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    if (!form) {
      return null;
    }

    const startDate = form.value.startDate;
    const endDate = form.value.endDate;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (end > start) {
      form.controls['endDate'].setErrors(null);
    } else {
      form.controls['endDate'].setErrors({ endDateBeforeStart: true });
    }

    return null;
  };
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Registration Form</h1>
        <p class="mb-6 text-sm text-gray-600">
          This form demonstrates cross field validation with reactive forms
        </p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
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
              formControlName="email"
              placeholder="Enter your email"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.email.invalid && !form.controls.email.untouched
              " />
            @if (
              form.controls.email.invalid && !form.controls.email.untouched
            ) {
              <p class="mt-1 text-sm text-red-600">
                @if (form.controls.email.hasError('required')) {
                  Email is required
                } @else if (form.controls.email.hasError('email')) {
                  Please enter a valid email address
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
              formControlName="password"
              placeholder="Enter your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.password.invalid &&
                !form.controls.password.untouched
              " />
            @if (
              form.controls.password.invalid &&
              !form.controls.password.untouched
            ) {
              <p class="mt-1 text-sm text-red-600">
                @if (form.controls.password.hasError('required')) {
                  Password is required
                } @else if (form.controls.password.hasError('minlength')) {
                  Password must be at least 6 characters
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
              formControlName="confirmPassword"
              placeholder="Confirm your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.confirmPassword.invalid &&
                !form.controls.confirmPassword.untouched
              " />
            @if (
              form.controls.confirmPassword.invalid &&
              !form.controls.confirmPassword.untouched
            ) {
              <p class="mt-1 text-sm text-red-600">
                @if (form.controls.confirmPassword.hasError('required')) {
                  Please confirm your password
                } @else if (
                  form.controls.confirmPassword.hasError('passwordMismatch')
                ) {
                  Passwords do not match
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
              formControlName="startDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.startDate.invalid &&
                !form.controls.startDate.untouched
              " />
            @if (
              form.controls.startDate.invalid &&
              !form.controls.startDate.untouched
            ) {
              <p class="mt-1 text-sm text-red-600">Start date is required</p>
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
              formControlName="endDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls.endDate.invalid &&
                !form.controls.endDate.untouched
              " />
            @if (
              form.controls.endDate.invalid && !form.controls.endDate.untouched
            ) {
              <p class="mt-1 text-sm text-red-600">
                @if (form.controls.endDate.hasError('required')) {
                  End date is required
                } @else if (
                  form.controls.endDate.hasError('endDateBeforeStart')
                ) {
                  End date must be after start date
                }
              </p>
            }
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
                [class.text-green-600]="form.valid"
                [class.text-red-600]="form.invalid">
                {{ form.valid ? 'Yes' : 'No' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Touched:</span>
              <span>{{ !form.untouched ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Dirty:</span>
              <span>{{ form.dirty ? 'Yes' : 'No' }}</span>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="mb-2 font-medium text-gray-700">Form Value:</h3>
            <pre
              class="overflow-x-auto rounded bg-gray-800 p-3 text-xs text-gray-100"
              >{{ form.value | json }}</pre
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
              >{{ this.form.getRawValue() | json }}</pre
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

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    },
    {
      validators: [passwordMatchValidator(), endDateAfterStartDateValidator()],
    },
  );

  // constructor() {
  //   this.form.controls.password.valueChanges
  //     .pipe(takeUntilDestroyed())
  //     .subscribe(() => {
  //       this.form.controls.confirmPassword.updateValueAndValidity();
  //     });
  //
  //   this.form.controls.startDate.valueChanges
  //     .pipe(takeUntilDestroyed())
  //     .subscribe(() => {
  //       this.form.controls.endDate.updateValueAndValidity();
  //     });
  // }

  onSubmit() {
    console.log('Submitting form...', this.form);
    if (this.form.valid) {
      this.isSubmitted.set(true);
      console.log('Form submitted:', this.form.getRawValue());
    }
  }

  onReset() {
    this.form.reset();
    this.isSubmitted.set(false);
  }
}
