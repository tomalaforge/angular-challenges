import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { HeaderComponent } from './header.component';
import { InputComponent } from './input.component';
import { PersonListComponent } from './person-list.component';
import { RandomComponent } from './random.component';

@Component({
  standalone: true,
  imports: [
    PersonListComponent,
    RandomComponent,
    InputComponent,
    CommonModule,
    HeaderComponent,
  ],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <div class="flex-auto">
        <app-header [title]="data[0].title"></app-header>
        <app-input (onLabelAdded)="addItem($event, 1)"></app-input>
        <app-person-list [names]="data[0].names" />
      </div>

      <div class="flex-auto">
        <app-header [title]="data[1].title"></app-header>
        <app-input (onLabelAdded)="addItem($event, 2)"></app-input>
        <app-person-list [names]="data[1].names" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  girlList = randFirstName({ gender: 'female', length: 10 });
  boyList = randFirstName({ gender: 'male', length: 10 });

  data = [
    {
      id: 1,
      names: this.girlList,
      title: 'Female',
    },
    {
      id: 2,
      names: this.boyList,
      title: 'Male',
    },
  ];

  addItem(item: string, id: number) {
    const index = this.data.findIndex((x) => x.id === id);

    if (index === -1) {
      return;
    }

    this.data[index].names = [...this.data[index].names, item];
  }
}
