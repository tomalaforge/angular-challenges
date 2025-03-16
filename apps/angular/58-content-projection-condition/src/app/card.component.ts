import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-container [ngTemplateOutlet]="titleTempl" />
      <ng-container [ngTemplateOutlet]="messageTempl" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="titleTempl" />
        </div>
        <ng-container [ngTemplateOutlet]="messageTempl" />
      </div>
    }

    <ng-template #titleTempl>
      <ng-content select="[title]" />
    </ng-template>
    <ng-template #messageTempl>
      <ng-content select="[message]" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
}
