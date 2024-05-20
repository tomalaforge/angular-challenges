import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { initReactPostComponent } from './ReactPost';

export type Post = {
  id: number;
  title: string;
  description: string;
  pictureLink: string;
};

@Component({
  standalone: true,
  selector: 'app-post',
  template: `
    <div></div>
  `,
  styles: [''],
})
export class PostComponent implements OnInit {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  @Output() selectPost = new EventEmitter<void>();

  ngOnInit(): void {
    initReactPostComponent(this.post(), () => {
      this.selectPost.emit();
    });
  }
}
