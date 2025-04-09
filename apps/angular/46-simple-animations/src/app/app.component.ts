import {
  animate,
  animateChild,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  imports: [
    // BrowserAnimationsModule
  ],
  selector: 'app-root',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          transform: 'translateX(-20%)',
          opacity: 0,
        }),
        animate(
          '500ms',
          style({
            opacity: 1,
            transform: 'translateX(0%)',
          }),
        ),
      ]),
    ]),

    trigger('listItem', [
      transition(':enter', [
        style({ transform: 'translateX(-10%)', opacity: 0 }),
        animate(
          '200ms linear',
          style({ transform: 'translateX(0%)', opacity: 1 }),
        ),
      ]),
    ]),

    trigger('stagger', [
      transition(':enter', [
        query('@listItem', stagger('100ms', animateChild())),
      ]),
    ]),
  ],
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
      <section @fadeIn>
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

      <section @stagger>
        <div @listItem class="list-item">
          <span>Name:</span>
          <span>Samuel</span>
        </div>

        <div @listItem class="list-item">
          <span>Age:</span>
          <span>28</span>
        </div>

        <div @listItem class="list-item">
          <span>Birthdate:</span>
          <span>02.11.1995</span>
        </div>

        <div @listItem class="list-item">
          <span>City:</span>
          <span>Berlin</span>
        </div>

        <div @listItem class="list-item">
          <span>Language:</span>
          <span>English</span>
        </div>

        <div @listItem class="list-item">
          <span>Like Pizza:</span>
          <span>Hell yeah</span>
        </div>
      </section>
    </div>
  `,
})
export class AppComponent {}
