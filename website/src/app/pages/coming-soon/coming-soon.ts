import { Component, input } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  template: `
    <div class="flex flex-col items-center justify-center gap-3 px-6 py-32 text-center">
      <p class="text-2xl font-semibold">{{ title() }}</p>
      <p class="text-neutral-400">
        This page is being rebuilt and will land here soon. In the meantime it is still available on
        <a [href]="fallback()" class="text-pink-500 hover:underline">the current docs site</a>.
      </p>
    </div>
  `,
})
export class ComingSoon {
  readonly title = input.required<string>();
  readonly fallback = input.required<string>();
}
