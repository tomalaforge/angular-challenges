import { Component, signal } from '@angular/core';
import { PostComponent } from './react/post.component';

type Post = { title: string; description: string };

@Component({
  imports: [PostComponent],
  selector: 'app-root',
  template: `
    <div class="flex flex-col gap-2 p-12">
      <div class="flex gap-2">
        @for (post of posts; track post.title) {
          <div class="rounded-lg bg-gray-100 p-4">
            <app-post
              (selectPost)="selectPost(post)"
              [post]="post"
              [isSelected]="post.title === selectedPost()?.title"></app-post>
          </div>
        }
      </div>
      <div class="flex flex-col gap-2 border p-4">
        <span class="text-xs font-medium">Selected Post:</span>
        <span class="text-lg text-blue-700">
          {{ selectedPost()?.title ?? '-' }}
        </span>
      </div>
    </div>
  `,
  styles: [''],
})
export class AppComponent {
  readonly posts = [
    {
      title: 'A Deep Dive into Angular',
      description:
        "Explore Angular's core features, its evolution, and best practices in development for creating dynamic, efficient web applications in our comprehensive guide.",
      pictureLink:
        'https://images.unsplash.com/photo-1471958680802-1345a694ba6d',
    },
    {
      title: 'The Perfect Combination',
      description:
        'Unveil the power of combining Angular & React in web development, maximizing efficiency and flexibility for building scalable, sophisticated applications.',
      pictureLink:
        'https://images.unsplash.com/photo-1518717202715-9fa9d099f58a',
    },
    {
      title: 'Taking Angular to the Next Level',
      description:
        "Discover how integrating React with Angular elevates web development, blending Angular's structure with React's UI prowess for advanced applications.",
      pictureLink:
        'https://images.unsplash.com/photo-1532103050105-860af53bc6aa',
    },
  ];

  readonly selectedPost = signal<Post | null>(null);

  selectPost(post: Post) {
    this.selectedPost.set(post);
  }
}
