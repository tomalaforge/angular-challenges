import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-container [ngTemplateOutlet]="imgTemplate"></ng-container>      

      <section>
        <ng-container
          *ngFor="let item of list"
        >
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{$implicit:item}"]></ng-container>
        </ng-container>
      </section>

      <ng-container [ngTemplateOutlet]="actionTemplate"></ng-container>
      
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() imgTemplate! : TemplateRef<any>;
  @Input() itemTemplate! : TemplateRef<any>;
  @Input() actionTemplate! : TemplateRef<any>;
}
