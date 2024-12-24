import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Post } from '../post.model';
import { ThumbnailHeaderComponent } from './thumbnail-header.component';

@Component({
  selector: 'blog-thumbnail',
  imports: [NgOptimizedImage, ThumbnailHeaderComponent, RouterLinkWithHref],
  template: `
    <a [routerLink]="['post', post().id]">
      <img
        [ngSrc]="post().image"
        alt=""
        width="960"
        height="540"
        class="rounded-t-3xl"
        [priority]="post().id === '1'" />
      <h2 class="p-3 text-3xl">{{ post().title }}</h2>
      <p class="p-3">{{ post().description }}</p>
      <thumbnail-header [date]="post().date" />
    </a>
  `,
  host: {
    class: 'w-full  max-w-[600px] rounded-3xl border-none shadow-lg',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent {
  post = input.required<Post>();
}
