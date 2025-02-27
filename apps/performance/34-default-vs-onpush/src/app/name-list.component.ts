import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-name-list',
  standalone: true,
  imports: [MatListModule, CDFlashingDirective, CommonModule],
  template: `
    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <mat-list-item
        *ngFor="let name of names"
        cd-flash
        class="text-orange-500">
        <div MatListItemLine class="flex justify-between">
          <h3 title="Name">{{ name }}</h3>
        </div>
      </mat-list-item>
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameListComponent {
  @Input() names: string[] = [];
}
