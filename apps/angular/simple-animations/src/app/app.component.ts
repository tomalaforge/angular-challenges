import { Component } from '@angular/core';
import { slideInAnimation, staggerInAnimation } from './app.animations';

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
  animations: [slideInAnimation, staggerInAnimation],
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section @slideIn>
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

      <section [@staggerIn]="data.length">
        @for (item of data; track item.label; let i = $index) {
          <div class="list-item">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </div>
        }
      </section>
    </div>
  `,
})
export class AppComponent {
  readonly data = [
    { label: 'Name', value: 'Samuel' },
    { label: 'Age', value: '28' },
    { label: 'Birthdate', value: '02.11.1995' },
    { label: 'City', value: 'Berlin' },
    { label: 'Language', value: 'English' },
    { label: 'Like Pizza', value: 'Hell yeah' },
  ];
}
