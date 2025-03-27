import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Directive,
  input,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[appCardTitle]',
})
export class CardTitleDirective {}

@Directive({
  selector: '[appCardMessage]',
})
export class CardMessageDirective {}

@Component({
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-container [ngTemplateOutlet]="cardTitle()" />
      <ng-container [ngTemplateOutlet]="cardMessage()" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="cardTitle()" />
        </div>
        <ng-container [ngTemplateOutlet]="cardMessage()" />
      </div>
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
  cardTitle = contentChild.required(CardTitleDirective, {
    read: TemplateRef,
  });
  cardMessage = contentChild.required(CardMessageDirective, {
    read: TemplateRef,
  });
}
