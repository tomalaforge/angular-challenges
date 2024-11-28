import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[card-header]"></ng-content>
      <div *ngFor="let item of items">
        <ng-container
          *ngTemplateOutlet="
            customTemplate;
            context: { $implicit: item }
          "></ng-container>
      </div>
      <ng-content select="[card-footer]"></ng-content>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .card {
        background-color: var(--card-background, white);
        border-color: var(--border-color, black);
      }
    `,
  ],
  imports: [NgFor, NgTemplateOutlet],
})
export class CardComponent {
  @Input() customTemplate!: TemplateRef<any>;
  @Input() items!: any[];
}
