import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  animations: [
    trigger('fadeInParagraphs', [
      transition(':enter', [
        query('.timeline-item', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          stagger(200, [
            animate(
              '600ms ease',
              style({ opacity: 1, transform: 'translateX(0)' }),
            ),
          ]),
        ]),
      ]),
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query('.list-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(100, [
            animate(
              '300ms ease',
              style({ opacity: 1, transform: 'translateX(0)' }),
            ),
          ]),
        ]),
      ]),
    ]),
  ],
  template: `
    <div class="container-wrapper">
      <div class="content-container">
        <section [@fadeInParagraphs] class="timeline-section">
          <div class="timeline-item">
            <h3>2008</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              mollitia sequi accusantium, distinctio similique laudantium
              eveniet quidem sit placeat possimus tempore dolorum inventore
              corporis atque quae ad, nobis explicabo delectus.
            </p>
          </div>

          <div class="timeline-item">
            <h3>2010</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              mollitia sequi accusantium, distinctio similique laudantium
              eveniet quidem sit placeat possimus tempore dolorum inventore
              corporis atque quae ad, nobis explicabo delectus.
            </p>
          </div>

          <div class="timeline-item">
            <h4>2012</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              mollitia sequi accusantium, distinctio similique laudantium
              eveniet quidem sit placeat possimus tempore dolorum inventore
              corporis atque quae ad, nobis explicabo delectus.
            </p>
          </div>
        </section>

        <section [@listAnimation] class="info-section">
          <div class="list-item">
            <span>Name:</span>
            <span>Samuel</span>
          </div>

          <div class="list-item">
            <span>Age:</span>
            <span>28</span>
          </div>

          <div class="list-item">
            <span>Birthdate:</span>
            <span>02.11.1995</span>
          </div>

          <div class="list-item">
            <span>City:</span>
            <span>Berlin</span>
          </div>

          <div class="list-item">
            <span>Language:</span>
            <span>English</span>
          </div>

          <div class="list-item">
            <span>Like Pizza:</span>
            <span>Hell yeah</span>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class AppComponent {}
