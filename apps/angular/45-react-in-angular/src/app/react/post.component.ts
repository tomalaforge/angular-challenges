import { Component, computed, input, output } from '@angular/core';
import { Post, ReactPostParams } from './ReactPost';
import { RenderReactDirective } from './render-react.directive';

@Component({
  standalone: true,
  selector: 'app-post',
  template: `
    <div appRenderReact [props]="postParams()"></div>
  `,
  imports: [RenderReactDirective],
})
export class PostComponent {
  post = input.required<Post>();
  isSelected = input.required<boolean>();
  selectPost = output();
  postParams = computed<ReactPostParams>(() => {
    return {
      ...this.post(),
      selected: this.isSelected(),
      handleClick: () => this.selectPost.emit(),
    };
  });
}
