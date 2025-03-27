import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-content select="[title]" />
      <ng-content select="[message]" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-content select="[title]" />
        </div>
        <ng-content select="[message]" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
}
