import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  template: `
    <section>
      <h1>{{ title() }}</h1>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  title = input.required<string>();
}
