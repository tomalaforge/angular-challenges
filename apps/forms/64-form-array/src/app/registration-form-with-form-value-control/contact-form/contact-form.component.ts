import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { FieldTree, FormValueControl } from '@angular/forms/signals';
import { ValidationComponent } from '../../validation/validation.component';
import { ContactValue, initialContactValue } from './contact-form.model';

@Component({
  selector: 'app-contact-form',
  imports: [ValidationComponent],
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent implements FormValueControl<ContactValue> {
  public readonly value = model<ContactValue>(initialContactValue);
  public readonly fieldTree = input.required<FieldTree<ContactValue>>();
  index = input(0);
  remove = output<void>();

  protected readonly modelTouched = model<{
    [K in keyof ContactValue]: boolean;
  }>({
    firstname: false,
    lastname: false,
    relation: false,
    email: false,
  });
  protected readonly modelDirty = model<{ [K in keyof ContactValue]: boolean }>(
    {
      email: false,
      firstname: false,
      lastname: false,
      relation: false,
    },
  );

  protected setModelTouched(key: keyof ContactValue): void {
    this.modelTouched.set({ ...this.modelTouched(), [key]: true });
  }

  protected setModelDirty(key: keyof ContactValue): void {
    this.modelDirty.set({ ...this.modelDirty(), [key]: true });
  }
}
