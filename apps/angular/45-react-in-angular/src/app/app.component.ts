import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactWrapperDirective } from './react-wrapper.directive';

interface Post {
  id: number;
  title: string;
  content: string;
  pictureLink: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactWrapperDirective, CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          *ngFor="let post of posts"
          reactPost
          [title]="post.title"
          [content]="post.content"
          [selected]="post.id === selectedId"
          [pictureLink]="post.pictureLink"
          (click)="selectPost(post.id)"></div>
      </div>
    </div>
  `,
})
export class AppComponent {
  selectedId?: number;

  posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first post content',
      pictureLink: '../assets/bird.jpg',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the second post content',
      pictureLink: '../assets/bird.jpg',
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the third post content',
      pictureLink: '../assets/bird.jpg',
    },
  ];

  selectPost(id: number) {
    this.selectedId = id;
  }
}
