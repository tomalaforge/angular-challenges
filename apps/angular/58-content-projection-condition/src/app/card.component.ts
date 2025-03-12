import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-container [ngTemplateOutlet]="title"></ng-container>
      <ng-container [ngTemplateOutlet]="message"></ng-container>
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="title"></ng-container>
        </div>
        <ng-container [ngTemplateOutlet]="message"></ng-container>
      </div>
    }

    <ng-template #title>
      <ng-content select="[title]"></ng-content>
    </ng-template>
    <ng-template #message>
      <ng-content select="[message]"></ng-content>
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
