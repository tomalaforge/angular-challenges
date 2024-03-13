import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, CDFlashingDirective],
  template: `
    <mat-list class="flex w-full">
      <div *ngIf="personNames?.length === 0" class="empty-list-label">
        Empty list
      </div>
      <mat-list-item
        *ngFor="let name of personNames"
        cd-flash
        class="text-orange-500">
        <div MatListItemLine class="flex justify-between">
          <h3 title="Name">
            {{ name }}
          </h3>
        </div>
      </mat-list-item>
      <mat-divider *ngIf="personNames?.length !== 0"></mat-divider>
    </mat-list>
  `,
})
export class ListComponent {
  personNames: string[] = [];
  @Input() set names(data: string[]) {
    this.personNames = data;
  }
}
