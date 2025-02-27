import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore } from './user.service';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form-container">
      <div class="form-section">
        <h2 class="section-title">Personal Information</h2>
        <div class="form-group">
          <label class="form-label">Name</label>
          <input class="form-input" formControlName="name" />
        </div>
      </div>

      <div class="form-section">
        <h2 class="section-title">Address</h2>
        <div class="space-y-4">
          <div class="form-group">
            <label class="form-label">Street</label>
            <input class="form-input" formControlName="street" />
          </div>
          <div class="form-group">
            <label class="form-label">Zip Code</label>
            <input class="form-input" formControlName="zipCode" />
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <input class="form-input" formControlName="city" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2 class="section-title">Employment</h2>
        <div class="space-y-4">
          <div class="form-group">
            <label class="form-label">Job Title</label>
            <input class="form-input" formControlName="title" />
          </div>
          <div class="form-group">
            <label class="form-label">Salary</label>
            <input type="number" class="form-input" formControlName="salary" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-group">
          <label class="form-label">Notes</label>
          <input class="form-input" formControlName="note" />
        </div>
      </div>

      <button type="submit" class="form-button">Save Changes</button>
    </form>
  `,
  host: {
    class: 'block p-6 bg-gray-50 min-h-screen',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  userStore = inject(UserStore);

  form = new FormGroup({
    name: new FormControl(this.userStore.name(), { nonNullable: true }),
    street: new FormControl(this.userStore.address().street, {
      nonNullable: true,
    }),
    zipCode: new FormControl(this.userStore.address().zipCode, {
      nonNullable: true,
    }),
    city: new FormControl(this.userStore.address().city, { nonNullable: true }),
    note: new FormControl(this.userStore.note(), { nonNullable: true }),
    title: new FormControl(this.userStore.job().title, { nonNullable: true }),
    salary: new FormControl(this.userStore.job().salary, { nonNullable: true }),
  });

  submit() {
    const values = this.form.getRawValue();

    this.userStore.updateName(values.name);
    this.userStore.updateAddress({
      street: values.street,
      zipCode: values.zipCode,
      city: values.city,
    });
    this.userStore.updateNote(values.note);
    this.userStore.updateJob(values.title, values.salary);
  }
}
