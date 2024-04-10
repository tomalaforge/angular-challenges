import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  template: `
    <form class="space-y-4">
      <div>
        <label class="sr-only" for="name">Name</label>
        <input
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Name"
          type="text"
          name="name"
          id="name" />
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="sr-only" for="email">Email</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Email address"
            type="email"
            name="email"
            id="email" />
        </div>

        <div>
          <label class="sr-only" for="phone">Phone</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Phone Number"
            type="tel"
            name="phone"
            id="phone" />
        </div>
      </div>

      <div>
        <label class="sr-only" for="message">Message</label>

        <textarea
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Message"
          rows="8"
          name="message"
          id="message"></textarea>
      </div>

      <div class="mt-4">
        <button
          type="submit"
          class="inline-block w-full rounded-lg border bg-gray-50 px-5 py-3 font-medium text-gray-900 sm:w-auto">
          Submit
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {}
