import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot } from 'react-dom/client';
import ReactPost from './ReactPost';

// Inspired by https://medium.com/@joseph5/rendering-react-component-in-angular-apps-9154fa3198d1

@Directive({
  standalone: true,
  selector: '[appRenderReact]',
})
export class RenderReactDirective<Comp extends ElementType>
  implements OnDestroy
{
  props = input.required<ComponentProps<Comp>>();
  private root = createRoot(inject(ElementRef).nativeElement);

  constructor() {
    effect(() => this.root.render(createElement(ReactPost, this.props())));
  }

  ngOnDestroy(): void {
    this.root.unmount();
  }
}
