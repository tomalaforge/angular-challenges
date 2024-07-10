import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[reactComponent]', standalone: true })
export class ReactComponentDirective<Comp extends ElementType>
  implements OnChanges, OnDestroy
{
  reactComponent = input.required<Comp>();
  props = input.required<ComponentProps<Comp>>();

  private root = createRoot(inject(ElementRef).nativeElement);

  ngOnChanges(changes: SimpleChanges): void {
    this.root.render(createElement(this.reactComponent(), this.props()));
  }

  ngOnDestroy(): void {
    this.root.unmount();
  }
}
