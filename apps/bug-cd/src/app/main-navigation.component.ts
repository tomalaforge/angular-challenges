import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeServiceService } from './fake.service';
import { Observable, map, of } from 'rxjs';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
    <ng-container *ngFor="let menu of menus">
      <a
        class="border px-4 py-2 rounded-md"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
        {{ menu.name }}
      </a>
    </ng-container>
  `,
  styles: [
    `
      a.isSelected {
        @apply bg-gray-600 text-white;
      }
    `,
  ],
  host: {
    class: 'flex flex-col p-2 gap-2',
  },
})
export class NavigationComponent {
  @Input() menus: MenuItem[] | undefined | null;
}

@Component({
  standalone: true,
  imports: [NavigationComponent, NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="menus$ | async as menus; else noInfo">
      <!-- Switching to Observable, instead of calling a function everytime a CD hits -->
      <app-nav [menus]="menus" />
    </ng-container>

    <ng-template #noInfo>
      <!-- Switching to Observable, instead of calling a function everytime a CD hits -->
      <app-nav [menus]="emptyMenu$ | async" />
    </ng-template>
  `,
  host: {},
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);
  menus$!: Observable<MenuItem[]>;
  emptyMenu$!: Observable<MenuItem[]>;
  constructor() {
    this.menus$ = this.fakeBackend
      .getInfoFromBackend()
      .pipe(map((info) => this.getMenu(info || '')));
    this.emptyMenu$ = of(this.getMenu(''));
  }

  getMenu(prop: string): MenuItem[] {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
