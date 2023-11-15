import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { PersonListViewerItemComponent } from './person-list-viewer-item';

@Component({
  selector: 'app-person-list-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatChipsModule,
    CDFlashingDirective,
    PersonListViewerItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <mat-list-item *ngFor="let name of names; trackBy: trackByName">
        <app-person-list-viewer-item [name]="name">
        </app-person-list-viewer-item>
      </mat-list-item>
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListViewerComponent {
  @Input() names: string[] = [];

  trackByName(index: number, name: string) {
    return name;
  }
}
