import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ItemsInterface } from './items.interface';
import { ParagraphComponent } from './paragraph.component';

@Component({
  standalone: true,
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
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section>
        @for (item of items.paragraphItem; track $index) {
          <div>
            <app-paragraph
              [data]="{
                title: item.title,
                content: item.content
              }"></app-paragraph>
          </div>
        } @empty {
          <div>no items</div>
        }
      </section>

      <section>
        <span [@listAnimation]="items.listItem.length">
          @for (item of items.listItem; track $index) {
            <div class="list-item">
              <span>{{ item.category }}</span>
              <span>{{ item.description }}</span>
            </div>
          } @empty {
            <div>no items</div>
          }
        </span>
      </section>
    </div>
  `,
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(':enter', [
          style({ transform: 'translateX(-10%)', opacity: 0 }),
          stagger(50, [
            animate(
              '0.6s ease-in-out',
              style({ transform: 'translateX(0%)', opacity: 1 }),
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  items: ItemsInterface = {
    paragraphItem: [
      {
        title: '2008',
        content: `
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Vitae mollitia sequi accusantium, distinctio similique laudantium eveniet
          quidem sit placeat possimus tempore dolorum inventore corporis atque
          quae ad, nobis explicabo delectus.`,
      },
      {
        title: '2010',
        content: `
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
           mollitia sequi accusantium, distinctio similique laudantium eveniet
           quidem sit placeat possimus tempore dolorum inventore corporis atque
           quae ad, nobis explicabo delectus.`,
      },
      {
        title: '2012',
        content: `
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
           mollitia sequi accusantium, distinctio similique laudantium eveniet
           quidem sit placeat possimus tempore dolorum inventore corporis atque
           quae ad, nobis explicabo delectus.
        `,
      },
    ],
    listItem: [
      { category: 'Name', description: 'Samuel' },
      { category: 'Age', description: '28' },
      { category: 'Birthdate', description: '02.11.1995' },
      { category: 'City', description: 'Berlin' },
      { category: 'Language', description: 'English' },
      { category: 'Like Pizza', description: 'Hell yeah' },
    ],
  };
}
