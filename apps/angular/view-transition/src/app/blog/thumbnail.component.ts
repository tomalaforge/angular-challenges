import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Post } from '../post.model';
import { BlogStore } from '../store';
import { ThumbnailHeaderComponent } from './thumbnail-header.component';

@Component({
  selector: 'blog-thumbnail',
  standalone: true,
  imports: [NgOptimizedImage, ThumbnailHeaderComponent, RouterLinkWithHref],
  template: `
    <a [routerLink]="['post', post().id]" (click)="updateSelectedPost()">
      <img
        [ngSrc]="post().image"
        alt=""
        width="960"
        height="540"
        class="post-image rounded-t-3xl"
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

  store = inject(BlogStore);

  updateSelectedPost() {
    this.store.updateSelectedPostById(this.post().id);
    this.store.saveBlogScrollY();
  }
}
