import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PermissionDirective } from './directives/permission.directive';

@Component({
  selector: 'app-information',
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *appHasRoleSuperAdmin>visible only for super admin</div>
    <div *appHasRole="'MANAGER'">visible if manager</div>
    <div *appHasRole="['MANAGER', 'READER']">
      visible if manager and/or reader
    </div>
    <div *appHasRole="['MANAGER', 'WRITER']">
      visible if manager and/or writer
    </div>
    <div *appHasRole="['CLIENT']">visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PermissionDirective],
})
export class InformationComponent {}
