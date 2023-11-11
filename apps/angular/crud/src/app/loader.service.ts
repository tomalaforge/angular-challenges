import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSource = new BehaviorSubject<boolean>(false);
  public loader$ = this.loaderSource.asObservable();

  public showLoader(): void {
    this.loaderSource.next(true);
  }

  public hideLoader(): void {
    this.loaderSource.next(false);
  }
}
