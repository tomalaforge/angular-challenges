import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="mb-4 flex gap-2">
      <button
        class="rounded border border-black bg-white px-4 py-2 text-black hover:bg-gray-200"
        routerLink="/profile">
        Profile Page
      </button>
      <button
        class="rounded border border-black bg-white px-4 py-2 text-black hover:bg-gray-200"
        (click)="navigate()">
        User Page
      </button>
    </div>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
})
export class Dashboard {
  private router = inject(Router);
  private userProfile = inject(UserProfileService);

  navigate() {
    this.userProfile.getProfile().subscribe((profile) => {
      void this.router.navigate(['/', profile]);
    });
  }
}
