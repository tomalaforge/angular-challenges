import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  //public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading$ = signal<boolean>(false);
}
