import { Component } from '@angular/core';
// import { fadeInAnimation, staggerAnimation } from './animations';

@Component({
  selector: 'app-root',
  // animations: [fadeInAnimation, staggerAnimation],
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

    .list .list-item {
      transition-property: opacity, transform;
      transition-duration: 500ms;
      transition-delay: calc(200ms * var(--index));
      @starting-style {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    .fade-in {
      transition-property: opacity, transform;
      transition-duration: 500ms;
      transition-timing-function: ease-in-out;
      @starting-style {
        opacity: 0;
        transform: translateX(-100%);
      }
    }
  `,
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <!-- <section @horizontalAnimation> -->
      <section class="fade-in">
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

      <!-- <section @staggerAnimation> -->
      <section class="list">
        @for (item of list; track item.key; let i = $index) {
          <div class="list-item" style="--index: {{ i }}">
            <span>{{ item.key }}</span>
            <span>{{ item.value }}</span>
          </div>
        }
      </section>
    </div>
  `,
})
export class AppComponent {
  readonly list: { key: string; value: string }[] = [
    { key: 'Name', value: 'Samuel' },
    { key: 'Age', value: '28' },
    { key: 'Birthdate', value: '02.11.1995' },
    { key: 'City', value: 'Berlin' },
    { key: 'Language', value: 'English' },
    { key: 'Like Pizza', value: 'Hell yeah' },
  ];
}
