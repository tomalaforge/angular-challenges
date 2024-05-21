import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'thumbnail-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="flex gap-3">
      <img
        ngSrc="assets/profil.webp"
        alt=""
        class="blog-author-photo rounded-full border border-black p-0.5"
        width="50"
        height="50" />
      <div class="flex flex-col justify-center gap-0.5">
        <span class="text-md blog-author font-bold uppercase">
          Thomas Laforge
        </span>
        <span class="blog-date text-sm">{{ date() }}</span>
      </div>
    </div>
    <img
      ngSrc="assets/angular.webp"
      alt=""
      width="50"
      height="50"
      class="blog-angular-logo" />
  `,
  host: {
    class: 'flex w-full px-4 py-5 gap-4 justify-between',
  },
})
export class ThumbnailHeaderComponent {
  date = input.required<string>();
}
