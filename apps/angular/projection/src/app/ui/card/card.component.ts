import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  styles: [
    `
      .card-container {
        background-color: var(--card-background-color, lightblue);
      }
    `,
  ],
})
export class CardComponent {
  @Input() list: any[] = [];
  @Input() imgUrl: string = '';
  @Output() newItem: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('rowTemplate', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: any }>;

  onAddClick() {
    this.newItem.emit();
  }
}
