/* eslint-disable @angular-eslint/directive-selector */
import { NgFor, NgForOf } from '@angular/common';
import {
  Directive,
  Input,
  NgIterable,
  NgModule,
  Provider,
  inject,
} from '@angular/core';

import { CdkVirtualForOf } from '@angular/cdk/scrolling';
@Directive({
  selector: '[ngForTrackByProp]',
  standalone: true,
})
export class NgForTrackByPropDirective<T> {
  @Input() ngForOf!: NgIterable<T>;

  @Input()
  set ngForTrackByProp(ngForTrackBy: keyof T) {
    // setter
    this.ngFor.ngForTrackBy = (index: number, item: T) => item[ngForTrackBy];
  }

  private ngFor = inject(NgForOf<T>, { self: true });
}

@Directive({
  selector: '[cdkVirtualForTrackByProp]',
  standalone: true,
})
export class CdkVirtualForTrackByPropDirective<T> {
  @Input() cdkVirtualForOf!: NgIterable<T>;

  @Input()
  set cdkVirtualForTrackByProp(cdkVirtualForTrackBy: keyof T) {
    // setter
    this.cdkVirtualFor.cdkVirtualForTrackBy = (index: number, item: T) =>
      item[cdkVirtualForTrackBy];
  }

  private cdkVirtualFor = inject(CdkVirtualForOf<T>, { self: true });
}

@Directive({
  selector: '[ngForTrackById]',
  standalone: true,
})
export class NgForTrackByIdDirective<T extends { id: string | number }> {
  @Input() ngForOf!: NgIterable<T>; // 2

  private ngFor = inject(NgForOf<T>, { self: true }); // 3

  constructor() {
    this.ngFor.ngForTrackBy = (index: number, item: T) => item.id; // 4
  }
}

@Directive({
  selector: '[cdkVirtualForTrackById]',
  standalone: true,
})
export class CdkVirtualForTrackByIdDirective<
  T extends { id: string | number }
> {
  @Input() cdkVirtualForOf!: NgIterable<T>;

  private cdkVirtualFor = inject(CdkVirtualForOf<T>, { self: true });

  constructor() {
    this.cdkVirtualFor.cdkVirtualForTrackBy = (index: number, item: T) =>
      item.id;
  }
}

export const NgForTrackByDirective: Provider[] = [
  NgForTrackByIdDirective,
  NgForTrackByPropDirective,
  CdkVirtualForTrackByPropDirective,
  CdkVirtualForTrackByIdDirective,
];

@NgModule({
  imports: [NgFor, NgForTrackByDirective],
  exports: [NgFor, NgForTrackByDirective],
})
export class NgForTrackByModule {}
