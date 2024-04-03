import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  #loader = signal<boolean>(false);
  loader = computed(this.#loader);

  public showLoader(): void {
    this.#loader.set(true);
  }
  public hideLoader(): void {
    this.#loader.set(false);
  }
}
