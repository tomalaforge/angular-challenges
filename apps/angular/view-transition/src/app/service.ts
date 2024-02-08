import { Injectable, signal } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CurrentTransitionService {
  readonly currentTransition = signal<ViewTransitionInfo | null>(null);
}
