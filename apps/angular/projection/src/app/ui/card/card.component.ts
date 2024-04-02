import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[cardImage]"></ng-content>
      <section>
        @for (item of list; track item.id) {
          <app-list-item [id]="item.id" (delete)="delete.emit(item.id)">
            <ng-container
              *ngTemplateOutlet="
                listTemplateRef || emptyTemplateRef;
                context: { $implicit: item }
              "></ng-container>
          </app-list-item>
        }
      </section>
      <ng-content select="[cardActionButton]"></ng-content>
    </div>
    <ng-template #emptyTemplateRef>
      <p>No List Template Found.</p>
    </ng-template>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet, NgClass],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;
  @Input() customClass!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ContentChild('listTemplateRef') listTemplateRef: TemplateRef<any> | null =
    null;

  @Output() delete: EventEmitter<number> = new EventEmitter();
}
