import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostService {
  readonly activeId = signal<string | undefined>(undefined);
}
