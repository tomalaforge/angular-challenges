import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <div class="flex flex-1 flex-col gap-5">
        <section>
          <h4 class="subtitle">2008</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </section>

        <section>
          <h4 class="subtitle">2010</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </section>

        <section>
          <h4 class="subtitle">2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </section>
      </div>

      <div class="flex flex-1 flex-col gap-5">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col border-b px-5 pb-2 lg:flex-row">
            <div class="key flex-1">Name:</div>
            <div class="value flex-1">Samuel</div>
          </div>

          <div class="flex flex-col border-b px-5 pb-2 lg:flex-row">
            <div class="key flex-1">Age:</div>
            <div class="value flex-1">28</div>
          </div>

          <div class="flex flex-col border-b px-5 pb-2 lg:flex-row">
            <div class="key flex-1">Birthdate:</div>
            <div class="value flex-1">02.11.1995</div>
          </div>

          <div class="flex flex-col border-b px-5 pb-2 lg:flex-row">
            <div class="key flex-1">City:</div>
            <div class="value flex-1">Berlin</div>
          </div>

          <div class="flex flex-col border-b px-5 pb-2 lg:flex-row">
            <div class="key flex-1">Language:</div>
            <div class="value flex-1">English</div>
          </div>

          <div class="flex flex-col border-b px-5 pb-2 lg:flex-row">
            <div class="key flex-1">Like Pizza:</div>
            <div class="value flex-1">Hell yeah</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [''],
})
export class AppComponent {}
