import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';

type RegistrationData = {
  email: string;
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
};

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormField, FormRoot],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isSubmitted = signal(false);

  private readonly _initialData: RegistrationData = {
    email: '',
    password: '',
    confirmPassword: '',
    startDate: '',
    endDate: '',
  };

  private _registrationModel = signal<RegistrationData>(this._initialData);

  protected registrationForm = form<RegistrationData>(
    this._registrationModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      email(schemaPath.email, {
        message: 'Please enter a valid email address',
      });
      required(schemaPath.password, { message: 'Password is required' });
      minLength(schemaPath.password, 6, {
        message: 'Password must be at least 6 characters',
      });
      required(schemaPath.confirmPassword, {
        message: 'Please confirm your password',
      });
      validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
        const confirmPassword = value();
        const password = valueOf(schemaPath.password);
        if (confirmPassword !== password) {
          return {
            kind: 'passwordMismatch',
            message: 'Passwords do not match',
          };
        }
        return null;
      });
      required(schemaPath.startDate, { message: 'Start date is required' });
      required(schemaPath.endDate, { message: 'End date is required' });
      validate(schemaPath.endDate, ({ value, valueOf }) => {
        const startDate = valueOf(schemaPath.startDate);
        const endDate = value();

        if (!startDate || !endDate) {
          return null;
        }

        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        if (end < start) {
          return {
            kind: 'endDateBeforeStart',
            message: 'End date must be after start date',
          };
        }

        return null;
      });
    },
    {
      submission: {
        action: async () => {
          if (this.registrationForm().valid()) {
            this.isSubmitted.set(true);
            console.log('Form submitted:', this.registrationForm().value());
          }
        },
      },
    },
  );

  public onReset(): void {
    this.registrationForm().reset(this._initialData);
    this.isSubmitted.set(false);
  }
}
