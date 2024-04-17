import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParagraphComponent } from './component/paragraph.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ParagraphComponent],
  selector: 'app-root',
  styles: `
    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }
  `,
  templateUrl: 'app.component.html',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(':enter', [
          style({ transform: 'translateX(-10%)', opacity: 0 }),
          stagger(50, [
            animate(
              '0.4s ease-in-out',
              style({ transform: 'translateX(0%)', opacity: 1 }),
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  state: State = {
    paragraphItems: [
      {
        title: '2008',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae mollitia
        sequi accusantium, distinctio similique laudantium eveniet quidem sit
        placeat possimus tempore dolorum inventore corporis atque quae ad, nobis
        explicabo delectus.`,
      },
      {
        title: '2010',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae mollitia
        sequi accusantium, distinctio similique laudantium eveniet quidem sit
        placeat possimus tempore dolorum inventore corporis atque quae ad, nobis
        explicabo delectus.`,
      },
      {
        title: '2012',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae mollitia
        sequi accusantium, distinctio similique laudantium eveniet quidem sit
        placeat possimus tempore dolorum inventore corporis atque quae ad, nobis
        explicabo delectus.`,
      },
    ],
    listItems: [
      { category: 'Name:', description: 'Samuel' },
      { category: 'Age:', description: 28 },
      { category: 'Birthdate:', description: '02.11.1995' },
      { category: 'City:', description: 'Berlin' },
      { category: 'Language:', description: 'English' },
      { category: 'Like Pizza:', description: 'Hell yeah' },
    ],
  };
}

type State = {
  listItems: ListItem[];
  paragraphItems: ParagraphItem[];
};

type ListItem = {
  category: string;
  description: string | number;
};

type ParagraphItem = {
  title: string;
  content: string;
};
