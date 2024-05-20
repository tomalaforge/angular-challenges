import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'post-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="relative transition">
      <img
        ngSrc="assets/profil.webp"
        alt=""
        class="profile-thumb rounded-full border border-black p-0.5"
        width="50"
        height="50" />
      <img
        ngSrc="assets/angular.webp"
        alt=""
        width="30"
        height="30"
        class="budge-thumb absolute -bottom-2 -right-2" />
    </div>
    <div class="post-details">
      <div class="text-md mt-2 font-bold uppercase">Thomas Laforge</div>
      <div class="text-center text-sm">{{ date() }}</div>
    </div>
  `,
  host: {
    class: 'flex flex-col justify-center items-center',
  },
})
export class PostHeaderComponent {
  date = input.required<string>();
}
