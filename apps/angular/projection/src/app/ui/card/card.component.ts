import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Teacher } from '../../model/teacher.model';
import { Student } from '../../model/student.model';
import { City } from '../../model/city.model';

type item = Teacher | Student | City;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: item[] | null = null;
  @Input() customClass = '';
  @ContentChild('listItem', { read: TemplateRef }) listItem: TemplateRef<{
    item: item;
  }> | null = null;

  trackByFn(index: number, item: item) {
    return item.id;
  }
}
