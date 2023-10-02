import { Component, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-item',
  template: ` <ng-container [ngTemplateOutlet]="listTemplate"></ng-container> `,
  standalone: true,
  imports: [CommonModule],
})
export class ListItemComponent {
  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;
}
