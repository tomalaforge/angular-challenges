import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FakeBackendService } from './fake-backend.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-xl font-semibold text-gray-800">
        {{ id() ? 'Edit User' : 'Add New User' }}
      </h2>
      @if (id() && userResource.isLoading()) {
        <div class="flex h-32 items-center justify-center">
          <div
            class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      } @else {
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              formControlName="firstname"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            @if (
              userForm.get('firstname')?.invalid &&
              userForm.get('firstname')?.touched
            ) {
              <p class="mt-1 text-xs text-red-500">Firstname is required</p>
            }
          </div>
          <div>
            <label
              for="lastname"
              class="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <input
              id="lastname"
              type="text"
              formControlName="lastname"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            @if (
              userForm.get('lastname')?.invalid &&
              userForm.get('lastname')?.touched
            ) {
              <p class="mt-1 text-xs text-red-500">Lastname is required</p>
            }
          </div>
          <div>
            <label for="age" class="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              formControlName="age"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            @if (userForm.get('age')?.invalid && userForm.get('age')?.touched) {
              <p class="mt-1 text-xs text-red-500">Age must be positive</p>
            }
          </div>
          <div>
            <label for="grade" class="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <input
              id="grade"
              type="number"
              formControlName="grade"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              (click)="onCancel()"
              class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="userForm.invalid"
              class="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
              {{ id() ? 'Update' : 'Add' }}
            </button>
          </div>
        </form>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private backend = inject(FakeBackendService);
  private router = inject(Router);

  id = input<string>();

  userResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params: { id } }) => {
      return id ? this.backend.getUser(Number(id)) : of(undefined);
    },
    defaultValue: undefined,
  });

  userForm = new FormGroup({
    firstname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    age: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    grade: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      const userValue = this.userResource.value();
      if (userValue) {
        this.userForm.patchValue(userValue);
      } else {
        this.userForm.reset({ firstname: '', lastname: '', age: 0, grade: 0 });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userValue = this.userResource.value();
      const obs = userValue
        ? this.backend.updateUser({
            ...this.userForm.getRawValue(),
            id: userValue.id,
          })
        : this.backend.addUser(this.userForm.getRawValue());

      obs.subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
