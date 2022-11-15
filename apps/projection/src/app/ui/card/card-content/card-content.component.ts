import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { CardContentDirective } from './card-content.directive';

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class CardContentComponent {
  @ViewChild(TemplateRef, { static: true })
  implicitTemplate!: TemplateRef<void>;

  @ContentChild(CardContentDirective, { read: TemplateRef, static: true })
  explicitTemplate!: TemplateRef<void>;

  get template(): TemplateRef<void> {
    return this.explicitTemplate ?? this.implicitTemplate;
  }
}
