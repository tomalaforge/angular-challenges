import { Component, WritableSignal, input, signal } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { Store } from '../../data-access/store';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">

      <ng-content select="card-header"></ng-content>
      
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.label()"
            [id]="item.id"
            [store]="store()"></app-list-item>
        }
      </section>


      <ng-content select="card-footer"></ng-content>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent {

  
  readonly customClass = input('');
  readonly store = input.required<Store<any>>();
  protected list: WritableSignal<any[]> = signal([]);

  ngOnInit() {
    this.list = this.store().getItems();
  }
}
