import {
  Component,
  EventEmitter,
  input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import * as React from 'react';
import { ReactComponentDirective } from '../render-react.directive';
import ReactPost from './ReactPost';

type Post = { title: string; description: string; pictureLink: string };

const containerElementRef = 'customReactComponentContainer';

@Component({
  standalone: true,
  selector: 'app-post',
  imports: [ReactComponentDirective],
  template: `
    <div [reactComponent]="ReactPost" [props]="postProps"></div>
  `,
  // styles: [''],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnChanges {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  @Output() selectPost = new EventEmitter<void>();
  ReactPost = ReactPost;
  postProps: React.ComponentProps<typeof ReactPost> = {
    title: this.post()?.title,
    description: this.post()?.description,
    pictureLink: this.post()?.pictureLink,
    selected: this.isSelected(),
    handleClick: () => {
      this.selectPost.emit();
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.postProps = {
      title: this.post()?.title,
      description: this.post()?.description,
      pictureLink: this.post()?.pictureLink,
      selected: this.isSelected(),
      handleClick: () => {
        this.selectPost.emit();
      },
    };
  }
}
