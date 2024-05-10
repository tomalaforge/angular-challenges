import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [DatePipe, RouterLink, NgOptimizedImage],
  template: `
    <img
      ngSrc="{{ photo().url_m }}"
      alt="{{ photo().title }}"
      class="image"
      width="300"
      height="300" />
    <p>
      <span class="font-bold">Title:</span>
      {{ photo().title }}
    </p>
    <p>
      <span class="font-bold">Owner:</span>
      {{ photo().ownername }}
    </p>
    <p>
      <span class="font-bold">Date:</span>
      {{ photo().datetaken | date }}
    </p>
    <p>
      <span class="font-bold">Tags:</span>
      {{ photo().tags }}
    </p>

    <button
      class="mt-10 rounded-md border border-black px-4 py-2"
      routerLink="">
      Back
    </button>
  `,
  host: {
    class: 'p-5 block',
  },
})
export default class DetailComponent {
  photo = input.required({
    transform: (value: string): Photo => JSON.parse(decodeURIComponent(value)),
  });
}
