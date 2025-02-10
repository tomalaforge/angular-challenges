import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'address-user',
  template: `
    <div cd-flash class="info-card">
      <h2 class="section-title">Address</h2>
      <div class="space-y-2">
        <div>Street: {{ address().street }}</div>
        <div>ZipCode: {{ address().zipCode }}</div>
        <div>City: {{ address().city }}</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class AddressComponent {
  private userService = inject(UserStore);
  protected address = this.userService.address;
}
