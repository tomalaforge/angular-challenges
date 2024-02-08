import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Post } from '../post.model';
import { ThumbnailHeaderComponent } from './thumbnail-header.component';

@Component({
  selector: 'blog-thumbnail',
  standalone: true,
  imports: [NgOptimizedImage, ThumbnailHeaderComponent, RouterLinkWithHref],
  template: `
    <a [routerLink]="['post', post().id]">
      <img
        [src]="post().image"
        alt=""
        class="animation-cover h-32 w-full rounded-t-3xl object-cover" />
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
