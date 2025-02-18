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
    name: new FormControl(this.userStore.name(), { nonNullable: true }),
    street: new FormControl(this.userStore.street(), {
      nonNullable: true,
    }),
    zipCode: new FormControl(this.userStore.zipCode(), {
      nonNullable: true,
    }),
    city: new FormControl(this.userStore.city(), {
      nonNullable: true,
    }),
    note: new FormControl(this.userStore.note(), { nonNullable: true }),
    title: new FormControl(this.userStore.title(), { nonNullable: true }),
    salary: new FormControl(this.userStore.salary(), {
      nonNullable: true,
    }),
  });

  submit() {
    this.userStore.name.set(this.form.value.name ?? '-');
    this.userStore.title.set(this.form.value.title ?? '_');
    this.userStore.note.set(this.form.value.note ?? '_');
    this.userStore.salary.set(this.form.value.salary ?? 0);
    this.userStore.street.set(this.form.value.street ?? '_');
    this.userStore.zipCode.set(this.form.value.zipCode ?? '_');
    this.userStore.city.set(this.form.value.city ?? '_');
  }
}
