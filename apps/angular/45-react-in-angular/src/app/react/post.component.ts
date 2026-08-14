import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';

type Post = { title: string; description: string; pictureLink: string };

@Component({
  selector: 'app-post',
  template: `
    <div></div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [''],
})
export class PostComponent {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  @Output() selectPost = new EventEmitter<void>();
}
