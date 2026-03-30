import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

import { Contact } from './types';

@Component({
  selector: 'app-contact-form',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="rounded-lg border border-slate-200 bg-slate-50/40 p-4"
      data-testid="contact-item">
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-sm font-semibold text-slate-700">
          Contact {{ index() + 1 }}
        </h3>
        <button
          type="button"
          class="btn-danger"
          aria-label="Remove contact {{ index() + 1 }}"
          (click)="remove.emit()">
          Remove
        </button>
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          First name
          <input class="input" type="text" [formField]="group().firstName" />
          <span class="hint">
            @if (
              group().firstName().invalid() &&
              (group().firstName().touched() || group().firstName().dirty())
            ) {
              {{ group().firstName().errors()[0].message }}
            }
          </span>
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Last name
          <input class="input" type="text" [formField]="group().lastname" />
          <span class="hint">
            @if (
              group().lastname().invalid() &&
              (group().lastname().touched() || group().lastname().dirty())
            ) {
              {{ group().lastname().errors()[0].message }}
            }
          </span>
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Relation
          <input class="input" type="text" [formField]="group().relation" />
          <span class="hint">
            @if (
              group().relation().invalid() &&
              (group().relation().touched() || group().relation().dirty())
            ) {
              {{ group().relation().errors()[0].message }}
            }
          </span>
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email
          <input class="input" type="email" [formField]="group().email" />
          <span class="hint">
            @if (
              group().email().invalid() &&
              (group().email().touched() || group().email().dirty())
            ) {
              @for (err of group().email().errors(); track err.kind) {
                {{ err.message }}
              }
            }
          </span>
        </label>
      </div>
    </div>
  `,
})
export class ContactFormComponent {
  readonly group = input.required<FieldTree<Contact, number>>();
  readonly index = input(0);
  readonly remove = output<void>();
}
