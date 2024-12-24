import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'post-header',
  imports: [NgOptimizedImage],
  template: `
    <div class="relative">
      <img
        ngSrc="assets/profil.webp"
        alt=""
        class="rounded-full border border-black p-0.5"
        width="50"
        height="50" />
      <img
        ngSrc="assets/angular.webp"
        alt=""
        width="30"
        height="30"
        class="absolute -bottom-2 -right-2" />
    </div>
    <span class="text-md mt-2 font-bold uppercase">Thomas Laforge</span>
    <span class="text-sm">{{ date() }}</span>
  `,
  host: {
    class: 'flex flex-col justify-center items-center',
  },
})
export class PostHeaderComponent {
  date = input.required<string>();
}
