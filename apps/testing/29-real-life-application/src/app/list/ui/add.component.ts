import { Component, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form" #ngForm="ngForm" (ngSubmit)="submit()">
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Description</mat-label>
        <input
          type="text"
          matInput
          formControlName="description"
          placeholder="My new task" />
        @if (form.controls.description.hasError('required')) {
          <mat-error>
            Description is
            <strong>required</strong>
          </mat-error>
        }
      </mat-form-field>
      <button
        class="ml-4"
        mat-flat-button
        color="primary"
        type="submit"
        [disabled]="loading">
        Add new Ticket
      </button>
    </form>
  `,
})
export class AddComponent {
  loading = input(false);

  addTicket = output<string>();

  form = new FormGroup({
    description: new FormControl(null, Validators.required),
  });

  submit() {
    if (this.form.valid) {
      this.addTicket.emit(this.form.value.description ?? '');
    }
  }
}
