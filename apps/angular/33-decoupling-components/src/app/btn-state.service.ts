import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BtnStateService {
  private isDisabledSubject = new BehaviorSubject<boolean>(false);
  isDisabled$ = this.isDisabledSubject.asObservable();

  setDisabledState(isDisabled: boolean) {
    this.isDisabledSubject.next(isDisabled);
  }
}
