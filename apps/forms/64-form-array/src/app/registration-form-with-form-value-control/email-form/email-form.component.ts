import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { FieldTree, FormValueControl } from '@angular/forms/signals';
import { ValidationComponent } from '../../validation/validation.component';
import { EmailValue, initialEmailValue } from './email-form.model';

@Component({
  selector: 'app-email-form',
  imports: [ValidationComponent],
  templateUrl: './email-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFormComponent implements FormValueControl<EmailValue> {
  public readonly value = model<EmailValue>(initialEmailValue);
  public readonly fieldTree = input.required<FieldTree<EmailValue>>();
  index = input(0);
  remove = output<void>();

  protected readonly modelTouched = model<{ [K in keyof EmailValue]: boolean }>(
    {
      email: false,
      type: false,
    },
  );
  protected readonly modelDirty = model<{ [K in keyof EmailValue]: boolean }>({
    email: false,
    type: false,
  });

  protected onEmailTypeChange(target: EventTarget | null): void {
    this.value.set({
      ...this.value(),
      type: (target as HTMLSelectElement).value,
    });
  }

  protected setModelTouched(key: keyof EmailValue): void {
    this.modelTouched.set({ ...this.modelTouched(), [key]: true });
  }

  protected setModelDirty(key: keyof EmailValue): void {
    this.modelDirty.set({ ...this.modelDirty(), [key]: true });
  }
}
