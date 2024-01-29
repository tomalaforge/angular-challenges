/* eslint-disable @angular-eslint/directive-selector */
import { NgForOf } from '@angular/common';
import { Directive, Input, NgIterable, Provider, inject } from '@angular/core';

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

export const NgForTrackByDirective: Provider[] = [
  NgForTrackByIdDirective,
  NgForTrackByPropDirective,
];
