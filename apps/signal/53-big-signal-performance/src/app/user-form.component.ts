import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore } from './user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-4">
      <div>
        Name:
        <input
          class="rounded-md border border-gray-400"
          formControlName="name" />
      </div>
      <div>
        Address:
        <div>
          street:
          <input
            class="rounded-md border border-gray-400"
            formControlName="street" />
        </div>
        <div>
          zipCode:
          <input
            class="rounded-md border border-gray-400"
            formControlName="zipCode" />
        </div>
        <div>
          city:
          <input
            class="rounded-md border border-gray-400"
            formControlName="city" />
        </div>
      </div>
      <div>
        note:
        <input
          class="rounded-md border border-gray-400"
          formControlName="note" />
      </div>
      <div>
        title:
        <input
          class="rounded-md border border-gray-400"
          formControlName="title" />
      </div>
      <div>
        salary:
        <input
          class="rounded-md border border-gray-400"
          formControlName="salary" />
      </div>
      <button class="w-fit border p-2">Submit</button>
    </form>
  `,
  host: {
    class: 'block border border-gray-500 p-4 pt-10 m-4',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  userStore = inject(UserStore);

  form = new FormGroup({
    name: new FormControl(this.userStore.userName(), { nonNullable: true }),
    street: new FormControl(this.userStore.userAddressStreet(), {
      nonNullable: true,
    }),
    zipCode: new FormControl(this.userStore.userAddressZipCode(), {
      nonNullable: true,
    }),
    city: new FormControl(this.userStore.userAddressCity(), {
      nonNullable: true,
    }),
    note: new FormControl(this.userStore.userNote(), { nonNullable: true }),
    title: new FormControl(this.userStore.userTitle(), { nonNullable: true }),
    salary: new FormControl(this.userStore.userSalary(), {
      nonNullable: true,
    }),
  });

  submit() {
    this.userStore.userName.set(this.form.getRawValue().name);
    this.userStore.userAddressStreet.set(this.form.getRawValue().street);
    this.userStore.userAddressZipCode.set(this.form.getRawValue().zipCode);
    this.userStore.userAddressCity.set(this.form.getRawValue().city);
    this.userStore.userNote.set(this.form.getRawValue().note);
    this.userStore.userTitle.set(this.form.getRawValue().title);
    this.userStore.userSalary.set(this.form.getRawValue().salary);
  }
}
