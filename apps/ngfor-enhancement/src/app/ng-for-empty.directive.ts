import {
  computed,
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  Input,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgFor } from '@angular/common';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
  hostDirectives: [{directive: NgFor, inputs: ['ngForOf', 'ngForTrackBy']}],
})
export class NgForEmptyDirective<T> {
  readonly #containerRef = inject(ViewContainerRef);

  readonly #items = signal([] as T[]);
  readonly #emptyTemplateRef = signal<TemplateRef<unknown> | null>(null);
  readonly #shouldDisplayEmptyTemplate = computed(() => !this.#items().length && this.#emptyTemplateRef());
  #emptyViewRef?: EmbeddedViewRef<unknown>;

  @Input() set ngForOf(value: T[]) {
    this.#items.set(value);
  }

  @Input() set ngForIfEmpty(ref: TemplateRef<unknown>) {
    this.#emptyTemplateRef.set(ref);
  }

  constructor() {
    effect(() => {
      this.#emptyViewRef?.destroy();
      if (this.#shouldDisplayEmptyTemplate()) this.#emptyViewRef = this.#containerRef.createEmbeddedView(this.#emptyTemplateRef()!);
    });
  }
}
