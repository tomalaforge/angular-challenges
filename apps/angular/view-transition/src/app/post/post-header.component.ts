import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'post-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <!--    <div class="flex flex-col gap-3">-->
    <div class="relative">
      <img
        ngSrc="assets/profil.webp"
        alt=""
        class="blog-user-avatar rounded-full border border-black p-0.5"
        width="50"
        height="50" />
      <img
        ngSrc="assets/angular.webp"
        alt=""
        width="30"
        height="30"
        class="blog-framework absolute -bottom-2 -right-2" />
    </div>
    <span class="text-md blog-user-name mt-2 font-bold uppercase">
      Thomas Laforge
    </span>
    <span class="blog-user-date text-sm">{{ date() }}</span>
    <!--    </div>-->
  `,
  host: {
    class: 'flex flex-col justify-center items-center',
  },
})
export class PostHeaderComponent {
  date = input.required<string>();
}
