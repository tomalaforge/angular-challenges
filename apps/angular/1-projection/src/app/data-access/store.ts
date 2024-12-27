import { signal } from '@angular/core';

export class Store<T extends { id: number }> {
  private elements = signal<T[]>([]);
  elements$ = this.elements.asReadonly();

  addAll(elements: T[]) {
    this.elements.update((currentElements) => [
      ...currentElements,
      ...elements,
    ]);
  }

  addOne(element: T) {
    this.elements.update((currentElements) => [...currentElements, element]);
  }

  deleteOne(id: number) {
    this.elements.update((currentElements) =>
      currentElements.filter((t) => t.id !== id),
    );
  }
}
