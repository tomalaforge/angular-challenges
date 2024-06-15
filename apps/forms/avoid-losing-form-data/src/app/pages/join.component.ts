import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { IFormState } from '../ui/form-state';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form #formSelector />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements IFormState {
  isDirty = () => !this.formSelector()?.isFormEmpty;
  public formSelector = viewChild.required<FormComponent>('formSelector');
}
