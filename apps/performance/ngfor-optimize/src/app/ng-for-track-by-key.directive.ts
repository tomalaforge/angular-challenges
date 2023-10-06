import { Directive, inject, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
export class NgForTrackByKeyDirective<T> {
  #ngFor: NgFor<T> = inject(NgFor);

  @Input() set ngForTrackByProperty(key: keyof T) {
    this.#ngFor.ngForTrackBy = (index: number, item: T) => item[key];
  }
}
