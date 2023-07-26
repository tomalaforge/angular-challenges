import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { FakeServiceService } from './fake.service';

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
  @Input({ required: true }) menus!: MenuItem[];
}

@Component({
  standalone: true,
  imports: [NavigationComponent, NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="menu$ | async as menu">
      <app-nav [menus]="menu" />
    </ng-container>
  `,
  host: {},
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);

  readonly menu$ = this.fakeBackend
    .getInfoFromBackend()
    .pipe(map((info) => this.getMenu(info ? info : '')));

  getMenu(prop: string) {
    console.log('Execute getMenu');
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
