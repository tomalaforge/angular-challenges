import { Component } from '@angular/core';
import { ANIMATIONS } from './app.animation';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  animations: ANIMATIONS,
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
      <section [@slideIn]>
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

      <section [@stagger]>
        @for (item of items; track item.detail) {
          <div class="list-item">
            <span>{{ item.detail }}:</span>
            <span>{{ item.value }}</span>
          </div>
        }
      </section>
    </div>
  `,
})
export class AppComponent {
  public items = [
    { detail: 'Name', value: 'Samuel' },
    { detail: 'Age', value: 28 },
    { detail: 'Birthdate', value: '02.11.1995' },
    { detail: 'City', value: 'Berlin' },
    { detail: 'Language', value: 'English' },
    { detail: 'LikePizza', value: 'Hell yeah' },
  ];
}
