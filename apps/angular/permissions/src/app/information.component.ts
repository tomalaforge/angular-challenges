import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleDirective } from './core/directive/has-role.directive';
import { CLIENT, MANAGER, READER, WRITER } from './user.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *appHasRoleSuperAdmin="true">visible only for super admin</div>
    <div *appHasRole="[MANAGER]">
      visible if manager. This content is only available is manager.
    </div>
    <div *appHasRole="[MANAGER, READER]">visible if manager and/or reader</div>
    <div *appHasRole="[MANAGER, WRITER]">visible if manager and/or writer</div>
    <div *appHasRole="[READER, WRITER]">visible if reader and writer</div>
    <div *appHasRole="[CLIENT]">visible if client</div>
    <div *appHasRole="[]">visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  readonly MANAGER = MANAGER;
  readonly READER = READER;
  readonly WRITER = WRITER;
  readonly CLIENT = CLIENT;
}
