import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import {
  afterRecomputation,
  cMin,
  cRequired,
  injectService,
  insertForm,
  insertFormAttributes,
  insertFormSubmit,
  insertNoopTypingAnchor,
  insertSelectFormTree,
  mutation,
  query,
  state,
  toSource,
  ValidatedFormValue,
} from '@craft-ng/core';
import { firstValueFrom } from 'rxjs';
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
      @if (id() && user.isLoading()) {
        <div class="flex h-32 items-center justify-center">
          <div
            class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      } @else {
        @let userForm = user.form();
        <form class="space-y-4">
          <div>
            @let firstNameField = userForm.selectFirstname();
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              [formField]="firstNameField"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm" />
            @for (exception of firstNameField().visibleExceptions().list; track exception.code) {
              @switch (exception.code) {
                @case ('required') {
                  <p class="mt-1 text-xs text-red-500">Firstname is required</p>
                }
                @default never;
              }
            }

          </div>
          <div>
            @let lastNameField = userForm.selectLastname();
            <label
              for="lastname"
              class="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <input
              id="lastname"
              type="text"
              [formField]="lastNameField"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm" />
            @for (exception of lastNameField().visibleExceptions().list; track exception.code) {
              @switch (exception.code) {
                @case ('required') {
                  <p class="mt-1 text-xs text-red-500">Lastname is required</p>
                }
                @default never;
              }
            }
          </div>
          <div>
            @let ageField = userForm.selectAge();
            <label for="age" class="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              [formField]="ageField"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm" />
            @for (exception of ageField().visibleExceptions().list; track exception.code) {
              @let code = exception.code;
              @switch (code) {
                @case ('required') {
                  <p class="mt-1 text-xs text-red-500">Age is required</p>
                }
                @case ('min') {
                  <p class="mt-1 text-xs text-red-500">Age must be positive</p>
                }
                @default never;
              }
            }
          </div>
          <div>
            @let gradeField = userForm.selectGrade();
            <label for="grade" class="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <input
              id="grade"
              type="number"
              [formField]="gradeField"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm" />
            @for (exception of gradeField().visibleExceptions().list; track exception.code) {
              @let code = exception.code;
              @switch (code) {
                @case ('required') {
                  <p class="mt-1 text-xs text-red-500">Grade is required</p>
                }
                @default never;
              }
            }
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              (click)="router.cancel()"
              class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
              Cancel
            </button>
            <button
              type="button"
              (click)="userForm.submit()"
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
  private readonly backend = inject(FakeBackendService);

  public readonly id = input<string>();

  private readonly userQuery = query({
    params: this.id,
    loader: ({ params: id }) => {
      return firstValueFrom(this.backend.getUser(Number(id)));
    },
  });

  private readonly save = mutation({
    method: (validUser: ValidatedFormValue<User | Omit<User, 'id'>>) =>
      validUser,
    loader: ({ params: user }) =>
      firstValueFrom(
        'id' in user
          ? this.backend.updateUser(user)
          : this.backend.addUser(user),
      ),
  });

  protected readonly user = state(
    computed<Omit<User, 'id'>>(
      () =>
        this.userQuery.safeValue() ?? {
          firstname: '',
          lastname: '',
          age: 0,
          grade: 0,
        },
    ),
    insertForm(
      insertFormSubmit(this.save),
      insertSelectFormTree(
        'firstname',
        insertNoopTypingAnchor, // avoid typing issue
        insertFormAttributes(() => ({ validators: [cRequired()] })),
      ),
      insertSelectFormTree(
        'lastname',
        insertNoopTypingAnchor, // avoid typing issue
        insertFormAttributes(() => ({ validators: [cRequired()] })),
      ),
      insertSelectFormTree(
        'age',
        insertNoopTypingAnchor, // avoid typing issue
        insertFormAttributes(() => ({
          validators: [cRequired(), cMin({ min: 0 })],
        })),
      ),
      insertSelectFormTree(
        'grade',
        insertNoopTypingAnchor, // avoid typing issue
        insertFormAttributes(() => ({ validators: [cRequired()] })),
      ),
    ),
    () => ({
      isLoading: this.userQuery.isLoading,
    }),
  );

  protected readonly router = injectService(Router, ({ navigate }) => ({
    cancel: () => navigate(['/']),
    backOnSaveResolved: afterRecomputation(
      toSource(this.save.status, {
        computed: (status) => status === 'resolved',
      }),
      (isSaveResolved) => isSaveResolved && navigate(['/']),
    ),
  }));
}
