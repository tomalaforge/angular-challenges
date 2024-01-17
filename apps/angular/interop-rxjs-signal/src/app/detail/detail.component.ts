import { DatePipe } from '@angular/common';
import { Component, Input as RouterInput } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <img src="{{ photo.url_m }}" alt="{{ photo.title }}" class="image" />
    <p>
      <span class="font-bold">Title:</span>
      {{ photo.title }}
    </p>
    <p>
      <span class="font-bold">Owner:</span>
      {{ photo.ownername }}
    </p>
    <p>
      <span class="font-bold">Date:</span>
      {{ photo.datetaken | date }}
    </p>
    <p>
      <span class="font-bold">Tags:</span>
      {{ photo.tags }}
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
  @RouterInput({
    required: true,
    transform: (value: string) => JSON.parse(decodeURIComponent(value)),
  })
  photo!: Photo;
}
