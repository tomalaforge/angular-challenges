import { MatListModule } from '@angular/material/list';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { NgForEmpty } from '../directive/ngForEmpty.directive';
import { CDFlashingDirective } from '@angular-challenges/shared/directives';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, NgForEmpty, CDFlashingDirective],
  host: {
    class: 'flex w-full',
  },
  template: `
    <mat-list class="flex w-full">
      <ng-template #emptyList class="empty-list-label">Empty list</ng-template>
      <mat-list-item
        *ngForEmpty="let name of names; else: emptyList; trackBy: trackByFn"
        cd-flash
        class="text-orange-500">
        <div MatListItemLine class="flex justify-between">
          <h3 title="Name">
            {{ name }}
          </h3>
        </div>
        <mat-divider></mat-divider>
      </mat-list-item>
    </mat-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() names: string[] = [];
  @ContentChild('listItem', { read: TemplateRef }) listItem: TemplateRef<{
    item: string;
  }> | null = null;

  trackByFn(index: number) {
    return index;
  }
}
