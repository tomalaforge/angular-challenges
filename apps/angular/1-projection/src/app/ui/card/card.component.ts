import { CommonModule } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>

      <ng-container [ngTemplateOutlet]="listTemplate" />
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent {
  readonly customClass = input('');

  @ContentChild('listTemplate') listTemplate!: TemplateRef<any>;
}
