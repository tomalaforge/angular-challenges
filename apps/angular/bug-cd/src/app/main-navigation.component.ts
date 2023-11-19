import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
    <ng-container *ngFor="let menu of menus; trackBy: track">
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
  @Input() menus!: MenuItem[];

  track(_: number, menu: MenuItem) {
    return menu.name;
  }
}

@Component({
  standalone: true,
  imports: [NavigationComponent, NgIf, AsyncPipe],
  template: ` <app-nav [menus]="menus()"></app-nav> `,
  host: {},
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);

  private readonly info = this.fakeBackend.getInfoFromBackend();

  readonly menus = computed(() => this.getMenu(this.info() || ''));

  private getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
