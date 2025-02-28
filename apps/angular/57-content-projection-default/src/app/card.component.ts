import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div>{{ title() }}</div>
    @if (message()) {
      <div>{{ message() }}</div>
    } @else {
      <div>Aucun message</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  title = input.required<string>();
  message = input<string | undefined>(undefined);
}
