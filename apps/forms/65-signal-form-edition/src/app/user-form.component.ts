import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { form, FormField, min, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';
import { FakeBackendService } from './fake-backend.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-form',
  imports: [FormField],
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
        <form (submit)="onSubmit($event)" class="space-y-4">
          <div>
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              [formField]="userSignalForm.firstname" />
            @if (
              userSignalForm.firstname().invalid() &&
              userSignalForm.firstname().touched()
            ) {
              @for (error of userSignalForm.firstname().errors(); track error) {
                <p class="mt-1 text-xs text-red-500">{{ error.message }}</p>
              }
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
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              [formField]="userSignalForm.lastname" />
            @if (
              userSignalForm.lastname().invalid() &&
              userSignalForm.lastname().touched()
            ) {
              @for (error of userSignalForm.lastname().errors(); track error) {
                <p class="mt-1 text-xs text-red-500">{{ error.message }}</p>
              }
            }
          </div>

          <div>
            <label for="age" class="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              [formField]="userSignalForm.age" />
            @if (
              userSignalForm.age().invalid() && userSignalForm.age().touched()
            ) {
              @for (error of userSignalForm.age().errors(); track error) {
                <p class="mt-1 text-xs text-red-500">{{ error.message }}</p>
              }
            }
          </div>

          <div>
            <label for="grade" class="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <input
              id="grade"
              type="number"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              [formField]="userSignalForm.grade" />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              (click)="onCancel()"
              class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
              Cancel
            </button>

            <button
              type="submit"
              [disabled]="userSignalForm().invalid()"
              class="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50">
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

  userModel = signal<Omit<User, 'id'>>({
    firstname: '',
    lastname: '',
    age: 0,
    grade: 0,
  });

  userSignalForm = form(this.userModel, (schemePath) => {
    required(schemePath.firstname, { message: 'Firstname is required' });
    required(schemePath.lastname, { message: 'Lastname is required' });
    required(schemePath.age);
    min(schemePath.age, 0, { message: 'Age must be positive' });
    required(schemePath.grade);
  });

  constructor() {
    effect(() => {
      const userValue = this.userResource.value();
      if (userValue) {
        this.userModel.set(userValue);
      } else {
        this.userModel.set({ firstname: '', lastname: '', age: 0, grade: 0 });
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.userSignalForm, async () => {
      const userValue = this.userResource.value();

      if (userValue) {
        await lastValueFrom(
          this.backend.updateUser({
            ...this.userModel(),
            id: userValue.id,
          }),
        );
      } else {
        await lastValueFrom(this.backend.addUser(this.userModel()));
      }

      this.router.navigate(['/']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
