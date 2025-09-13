import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button.component';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ButtonComponent],
  template: `
    <p>
      <ng-content></ng-content>
    </p>
    <button app-button (click)="onHandleLogout()">Logout</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  router = inject(Router);
  userStore = inject(UserStore);

  onHandleLogout() {
    this.userStore.add(undefined);
    this.router.navigate(['/']).then();
  }
}
