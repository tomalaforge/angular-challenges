import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CardContentComponent } from './card-content';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        width: 240px;
        height: 550px;
        display: flex;
      }
      img {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        background: #fff;
      }
      .content {
        flex: 1 1 0;
        overflow: auto;
      }
    `,
  ],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  @ContentChild(CardContentComponent)
  cardContent!: CardContentComponent;

  @HostBinding('style.backgroundColor')
  @Input()
  backgroundColor!: string;

  @Input()
  image!: string;

  @Output()
  addClick = new EventEmitter<void>();
}
