import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-profile-page',
  template: `
    <button
      class="mb-4 rounded bg-gray-400 px-4 py-2 text-white"
      routerLink="/">
      Back
    </button>
    <div class="mb-4 flex gap-2">
      <button
        class="rounded border border-black bg-white px-4 py-2 text-black hover:bg-gray-200"
        (click)="chooseProfile('admin')">
        Choose Admin Profile
      </button>
      <button
        class="rounded border border-black bg-white px-4 py-2 text-black hover:bg-gray-200"
        (click)="chooseProfile('user')">
        Choose User Profile
      </button>
    </div>
    <div class="text-lg font-semibold">
      Current profile: {{ selectedProfile() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class ProfilePage {
  private userProfile = inject(UserProfileService);
  selectedProfile = signal<'admin' | 'user'>('admin');

  chooseProfile(profile: 'admin' | 'user') {
    this.userProfile.setProfile(profile);
    this.selectedProfile.set(profile);
  }
}
