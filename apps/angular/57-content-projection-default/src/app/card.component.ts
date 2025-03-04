import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div><ng-content select="card-title"></ng-content></div>
    <div><ng-content select="card-message">Aucun message</ng-content></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {}
