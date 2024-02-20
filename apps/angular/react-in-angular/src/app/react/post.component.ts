import {
  Component,
  EventEmitter,
  input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';
import { ReactComponentDirective } from '../reactComponent.directive';
type Post = { title: string; description: string; pictureLink: string };

@Component({
  standalone: true,
  selector: 'app-post',
  template: `
    <div
      appReactDirective
      [props]="post()"
      [props.selected]="isSelected()"
      (click)="selectPost.emit()"></div>
  `,
  styles: [''],
  imports: [ReactComponentDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PostComponent {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  @Output() selectPost = new EventEmitter<void>();
}
