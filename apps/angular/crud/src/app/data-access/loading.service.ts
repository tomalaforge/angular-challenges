import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class LoadingService {
  private _isLoadingSrc$$ = new BehaviorSubject<boolean>(true);
  isLoading$ = this._isLoadingSrc$$.asObservable();

  startLoading(){
    this._isLoadingSrc$$.next(true);
  }

  stopLoading(){
    this._isLoadingSrc$$.next(false);
  }
  
}