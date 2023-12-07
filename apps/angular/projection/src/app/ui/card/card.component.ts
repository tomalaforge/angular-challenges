import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: var(--bg-light-red);
      }
      .bg-light-green {
        background-color: var(--bg-light-green);
      }
      .bg-light-blue {
        background-color: var(--bg-light-blue);
      }

      :host-context(.teacher-theme) .bg-light-red {
        background-color: var(--bg-light-red);
      }
    `,
  ],
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: unknown[] | null = null;
  @Input() customClass = '';
  @Output() deleteBtnClicked = new EventEmitter<number>();
  @ContentChild('specialTemplateRef', { read: TemplateRef })
  specialTemplate!: TemplateRef<{ $implicit: ListItemComponent }>;
}
