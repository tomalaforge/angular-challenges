import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, CDFlashingDirective],
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div MatListItemLine class="flex justify-between">
        <h3 title="Name">
          <ng-content></ng-content>
        </h3>
      </div>
    </mat-list-item>
  `,
})
export class PersonItemComponent {}
