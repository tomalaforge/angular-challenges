import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserStore } from './user.store';
import { HasRole } from './common/directives/hasRole.directive';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [HasRole],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRoleIsAdmin="true">visible only for super admin</div>
    <div *hasRole="'MANAGER'">visible if manager</div>
    <div *hasRole="['MANAGER', 'READER']">visible if manager and/or reader</div>
    <div *hasRole="['WRITER', 'MANAGER']">visible if manager and/or writer</div>
    <div *hasRole="'CLIENT'">visible if client</div>
    <div *hasRole="[]">visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  user$ = this.userStore.user$;
  constructor(private userStore: UserStore) {}
}
