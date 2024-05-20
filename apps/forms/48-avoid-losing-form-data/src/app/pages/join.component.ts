import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CanComponentDeactivate,
  CanDeactivateType,
} from '../core/can-deactivate.guard';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form [formGroup]="form">
          <div>
            <label class="sr-only" for="name">Name</label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              formControlName="name"
              id="name" />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="sr-only" for="email">Email</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                formControlName="email"
                id="email" />
            </div>

            <div>
              <label class="sr-only" for="phone">Phone</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                formControlName="phone"
                id="phone" />
            </div>
          </div>

          <div>
            <label class="sr-only" for="message">Message</label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              formControlName="message"
              id="message"></textarea>
          </div>
        </app-form>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements CanComponentDeactivate {
  private readonly fb = inject(FormBuilder);
  private readonly formComponent = viewChild(FormComponent);

  protected form = this.fb.nonNullable.group({
    name: ['', { validators: [Validators.required] }],
    email: ['', [Validators.required, Validators.email]], // other syntax
    phone: '',
    message: '',
  });

  canDeactivate(): CanDeactivateType {
    return this.formComponent()?.canDeactivate() ?? false;
  }
}
