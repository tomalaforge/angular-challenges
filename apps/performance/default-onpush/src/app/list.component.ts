import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ItemComponent } from './item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, MatChipsModule, ItemComponent],
  template: `
    <mat-list class="flex w-full">
      @for (name of names; track name) {
        <app-item [name]="name" />
      } @empty {
        <div class="empty-list-label">Empty list</div>
      }
      @if (names.length) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() names!: string[];
}
