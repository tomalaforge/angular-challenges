import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading = signal<boolean>(false);

  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }
}
