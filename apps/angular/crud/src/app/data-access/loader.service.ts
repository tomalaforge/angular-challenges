import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private apiCount = 0;
  private isLoadingSubject = signal<boolean>(false);
  isLoading$ = computed(this.isLoadingSubject);

  constructor() {}

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSubject.set(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSubject.set(false);
    }
  }
}
