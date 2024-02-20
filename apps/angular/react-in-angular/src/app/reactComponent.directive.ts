import { Directive, ElementRef, Input, inject } from '@angular/core';
import React, { ComponentProps } from 'react';
import { createRoot } from 'react-dom/client';
import ReactPost from './react/ReactPost';
@Directive({
  selector: '[appReactDirective]',
  standalone: true,
})
export class ReactComponentDirective<Comp extends React.ElementType> {
  @Input() props!: ComponentProps<Comp>;

  private root = createRoot(inject(ElementRef).nativeElement);

  ngOnInit(): void {
    this.root.render(React.createElement(ReactPost, this.props));
  }

  ngOnDestroy(): void {
    this.root.unmount();
  }
}
