import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="img" />

      <ng-container *ngFor="let item of list">
        <ng-template
          [ngTemplateOutlet]="rowTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent {
  @Output() add = new EventEmitter<void>();
  @Input() list: any[] | null = null;

  @ContentChild('rowTemplate', { read: TemplateRef })
  rowTemplate!: TemplateRef<any>;
}
