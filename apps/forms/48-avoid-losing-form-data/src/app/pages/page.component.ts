import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <h2 class="text-3xl font-bold sm:text-4xl">
          {{ title() }}
        </h2>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div class="relative h-64 overflow-hidden sm:h-80 lg:h-full">
          <img
            alt="Sample Image"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
            class="absolute inset-0 h-full w-full rounded-lg object-cover" />
        </div>

        <div class="lg:py-16">
          <article class="space-y-4 text-gray-600">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
              hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
              minus veniam tempora deserunt? Molestiae eius quidem quam
              repellat.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
              explicabo quidem voluptatum voluptas illo accusantium ipsam quis,
              vel mollitia? Vel provident culpa dignissimos possimus,
              perferendis consectetur odit accusantium dolorem amet voluptates
              aliquid, ducimus tempore incidunt quas.
            </p>
          </article>

          <a
            href="#"
            class="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
            Learn More
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  title = input.required<string>();
}
