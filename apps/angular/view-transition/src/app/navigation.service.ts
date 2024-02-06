import { inject, Injectable, signal } from '@angular/core';
import { Event, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);
  currentPostId = signal(1);

  oldScroll = signal(0);

  init() {
    this.router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is NavigationStart =>
            e instanceof NavigationStart,
        ),
      )
      .subscribe((e) => {
        if (location.pathname.includes('post')) {
          const postId = Number(location.pathname.split('/')[2]);
          this.currentPostId.set(postId - 1);
        } else {
          const postId = Number(e.url.split('/')[2]);
          this.currentPostId.set(postId - 1);
          this.oldScroll.set(window.scrollY);
        }
      });
  }
}
