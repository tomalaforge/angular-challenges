import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
}
