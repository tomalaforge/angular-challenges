import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'post-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="relative">
      <img
        ngSrc="assets/profil.webp"
        alt=""
        class="animation-profil rounded-full border border-black p-0.5"
        width="50"
        height="50" />
      <img
        ngSrc="assets/angular.webp"
        alt=""
        width="30"
        height="30"
        class="animation-logo absolute -bottom-2 -right-2" />
    </div>
    <span class="text-md mt-2 font-bold uppercase">Thomas Laforge</span>
    <span class="text-sm">{{ date() }}</span>
  `,
  host: {
    class: 'flex flex-col justify-center items-center',
  },
  styles: [
    '.animation-profil{view-transition-name: animation-profil;}',
    '.animation-logo{view-transition-name: animation-logo;}',
  ],
})
export class PostHeaderComponent {
  date = input.required<string>();
}
