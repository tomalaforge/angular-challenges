import { Component } from '@angular/core';
import { CardComponent } from './ui/card/card.component';
import { CardType } from './model/card.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div class="grid grid-cols-3 gap-3">
      <app-card
        *ngFor="let card of cards"
        [cardType]="card.type"
        [labelKey]="card.labelKey"
        [style.--bg-color]="card.bgColor || '#FFFFFF'">
        <ng-template #image [ngIf]="card.imageSrc">
          <img [src]="card.imageSrc" width="200px" />
        </ng-template>
      </app-card>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, CardComponent],
})
export class AppComponent {
  types = [CardType.TEACHER, CardType.STUDENT, CardType.CITY];

  cards = [
    {
      type: CardType.TEACHER,
      labelKey: 'firstname',
      imageSrc: 'assets/img/teacher.png',
      bgColor: 'rgba(250, 0, 0, 0.1)',
    },
    {
      type: CardType.STUDENT,
      labelKey: 'firstname',
      imageSrc: 'assets/img/student.webp',
      bgColor: 'rgba(0, 250, 0, 0.1)',
    },
    {
      type: CardType.CITY,
      labelKey: 'name',
    },
  ];
}
