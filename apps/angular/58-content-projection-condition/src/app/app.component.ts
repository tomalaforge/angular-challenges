import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { CardComponent } from './card.component';

@Directive({
  selector: '[appCardTitle]',
})
export class CardTitleTemplateDirective {}

@Directive({
  selector: '[appCardMessage]',
})
export class CardMessageTemplateDirective {}

@Component({
  imports: [
    CardComponent,
    CardTitleTemplateDirective,
    CardMessageTemplateDirective,
  ],
  selector: 'app-root',
  template: `
    <app-card>
      <ng-template appCardTitle>
        <div class="text-2xl"><div>Card 1</div></div>
      </ng-template>
      <ng-template appCardMessage><div>Message 1</div></ng-template>
    </app-card>
    <app-card [small]="true">
      <ng-template appCardTitle>
        <div>Card 2</div>
      </ng-template>
      <ng-template appCardMessage><div>Message 2</div></ng-template>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
