import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  max,
  min,
  required,
} from '@angular/forms/signals';

type UserData = {
  name: string;
  lastname: string;
  age: number | null;
  note: string;
};

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormField, FormRoot],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _initialData: UserData = {
    name: '',
    lastname: '',
    age: null,
    note: '',
  };
  private _userModel = signal<UserData>(this._initialData);

  protected userForm = form(
    this._userModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Name is required' });
      min(schemaPath.age, 1, { message: 'Age must be at least 1' });
      max(schemaPath.age, 99, { message: 'Age must be at most 99' });
    },
    {
      submission: {
        action: async () => {
          if (this.userForm().valid()) {
            this.setSubmittedData();
          }
        },
      },
    },
  );
  protected submittedData: WritableSignal<UserData | null> = signal(null);

  public onReset(): void {
    this.userForm().reset(this._initialData);
    this.setSubmittedData();
  }

  private setSubmittedData(): void {
    const formData = this._userModel();
    console.log('Form submitted:', formData);
    this.submittedData.set(formData);
  }
}
