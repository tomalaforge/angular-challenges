import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ListItemComponent } from '../list-item/list-item.component';
import { ToDoItem } from '../../../components/to-do/store/model/to-do.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgFor,
    MatListModule,
    MatDividerModule,
    ListItemComponent,
  ],
  template: `
    <mat-list>
      <mat-list-item *ngFor="let item of list; trackBy: trackByFn">
        <app-list-item>
          <ng-container *ngTemplateOutlet="listItem; context: { item }" />
        </app-list-item>
        <mat-divider></mat-divider>
      </mat-list-item>
    </mat-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @ContentChild('listItem', { read: TemplateRef }) listItem: TemplateRef<{
    item: ToDoItem;
  }> | null = null;
  @Input() list: ToDoItem[] | [] | null = null;

  trackByFn(index: number, item: ToDoItem) {
    return item.id;
  }
}
