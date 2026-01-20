import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-container *ngTemplateOutlet="titleTemplate" />
      <ng-container *ngTemplateOutlet="messageTemplate" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container *ngTemplateOutlet="titleTemplate" />
        </div>
        <ng-container *ngTemplateOutlet="messageTemplate" />
      </div>
    }

    <ng-template #titleTemplate>
      <ng-content select="[title]" />
    </ng-template>

    <ng-template #messageTemplate>
      <ng-content select="[message]" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  small = input<boolean>(false);
}
