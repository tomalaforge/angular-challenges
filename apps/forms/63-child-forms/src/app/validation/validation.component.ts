import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationComponent {
  public readonly fieldState = input.required<FieldState<unknown, string>>();

  protected readonly showError = computed(
    () =>
      this.fieldState().invalid() &&
      (this.fieldState().touched() || this.fieldState().dirty()) &&
      this.fieldState().errors(),
  );
}
