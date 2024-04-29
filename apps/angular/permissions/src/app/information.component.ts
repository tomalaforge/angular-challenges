import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoleDirective } from './role.directive';
import { Role } from './user.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [RoleDirective, CommonModule],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <button *roleAdmin="true">visible only for super admin</button>
    <button *hasRole="Role.MANAGER">visible if manager</button>
    <button *hasRole="[Role.MANAGER, Role.READER]">
      visible if manager and/or reader
    </button>
    <button *hasRole="[Role.MANAGER, Role.WRITER]">
      visible if manager and/or writer
    </button>
    <button *hasRole="Role.CLIENT">visible if client</button>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  protected readonly Role = Role;
}
