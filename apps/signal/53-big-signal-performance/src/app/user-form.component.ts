import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore } from './user.service';

@Component({
  selector: 'user-form',
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
    name: new FormControl(this.userStore.user.name(), { nonNullable: true }),
    street: new FormControl(this.userStore.user.address().street, {
      nonNullable: true,
    }),
    zipCode: new FormControl(this.userStore.user.address().zipCode, {
      nonNullable: true,
    }),
    city: new FormControl(this.userStore.user.address().city, {
      nonNullable: true,
    }),
    note: new FormControl(this.userStore.user.note(), { nonNullable: true }),
    title: new FormControl(this.userStore.user.title(), { nonNullable: true }),
    salary: new FormControl(this.userStore.user.salary(), {
      nonNullable: true,
    }),
  });

  submit() {
    const formValues = this.form.getRawValue();

    this.userStore.user.name.set(formValues.name);
    this.userStore.user.title.set(formValues.title);
    this.userStore.user.salary.set(formValues.salary);

    const address = {
      street: formValues.street,
      zipCode: formValues.zipCode,
      city: formValues.city,
    };

    if (
      JSON.stringify(address) !== JSON.stringify(this.userStore.user.address())
    ) {
      this.userStore.user.address.set(address);
    }
  }
}
