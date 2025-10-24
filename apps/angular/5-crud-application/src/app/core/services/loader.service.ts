import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();

  show() {
    this._isLoading.set(true);
  }
  hide() {
    this._isLoading.set(false);
  }
}
