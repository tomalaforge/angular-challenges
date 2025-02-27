import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import ReactPost from './react/ReactPost';

@Directive({
  selector: '[reactPost]',
  standalone: true,
})
export class ReactWrapperDirective implements OnChanges, OnDestroy {
  @Input() title = '';
  @Input() content = '';
  @Input() selected = false;
  @Input() pictureLink = '';
  private root = createRoot(this.el.nativeElement);

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.root.render(
      React.createElement(ReactPost, {
        title: this.title,
        description: this.content,
        selected: this.selected,
        pictureLink: this.pictureLink,
        handleClick: () => {
          console.log('clicked');
        },
      }),
    );
  }

  ngOnDestroy() {
    this.root.unmount();
  }
}
