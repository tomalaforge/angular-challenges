import { Component, input, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ContactModel } from './registration.model';
import { ValidationMessageComponent } from './validation-message.component';

@Component({
  selector: 'app-contact-form',
  imports: [FormField, ValidationMessageComponent],
  templateUrl: './contact-form.component.html',
  styles: `
    @reference "tailwindcss";

    .input {
      @apply w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200;
    }
    .hint {
      @apply text-xs text-rose-600;
    }
    .btn-primary {
      @apply rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-300;
    }
    .btn-secondary {
      @apply rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600;
    }
    .btn-danger {
      @apply rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:text-rose-700;
    }
  `,
})
export class ContactFormComponent {
  formField = input.required<FieldTree<ContactModel>>();
  index = input(0);

  remove = output<void>();
}
