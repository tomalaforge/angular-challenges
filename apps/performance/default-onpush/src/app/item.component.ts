import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CDFlashingDirective, MatListModule],
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div MatListItemLine class="flex justify-between">
        <h3 title="Name">
          {{ name }}
        </h3>
      </div>
    </mat-list-item>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() name!: string;
}
