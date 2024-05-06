import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
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
      <section [@fadeIn]>
        <div>
          <h3>2008</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h3>2010</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h4>2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>
      </section>
      <section @staggerIn>
        @for (item of list; track item.key) {
          <div class="list-item">
            <span>{{ item.key }}:</span>
            <span>{{ item.value }}</span>
          </div>
        }
      </section>
    </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.list-item', style({ opacity: 0 }), { optional: true }),
        query(
          '.list-item',
          stagger('100ms', [
            animate(
              '400ms 200ms',
              keyframes([
                style({
                  opacity: 0,
                  transform: 'translateX(-20px)',
                  offset: 0,
                }),
                style({
                  opacity: 0.5,
                  transform: 'translateX(10px)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
              ]),
            ),
          ]),
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  readonly list: { key: string; value: string }[] = [
    { key: 'Name', value: 'Samuel' },
    { key: 'Age', value: '28' },
    { key: 'Birthdate', value: 'City' },
    { key: 'Language', value: 'English' },
    { key: 'Like Pizza', value: 'Hell yeah' },
  ];
}
