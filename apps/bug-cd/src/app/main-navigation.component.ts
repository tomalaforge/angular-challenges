import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeServiceService } from './fake.service';
import { tap } from 'rxjs';

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
  @Input() menus: MenuItem[] | undefined;
}

@Component({
  standalone: true,
  imports: [NavigationComponent, NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="info$ | async as info">
      <ng-container *ngIf="info !== null; else noInfo">
        <!-- Switching to a variable, instead of calling a function everytime a CD hits -->
        <app-nav [menus]="menus" />
      </ng-container>
    </ng-container>

    <ng-template #noInfo>
      <!-- Switching to a variable, instead of calling a function everytime a CD hits -->
      <app-nav [menus]="menus" />
    </ng-template>
  `,
  host: {},
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);
  info$: any;
  menus: MenuItem[] = [];
  constructor() {
    this.info$ = this.fakeBackend.getInfoFromBackend().pipe(
      // Using tap operator to update menus via the function every time info$ changes
      tap((info) => {
        if (info !== null) {
          this.menus = this.getMenu(info);
        } else {
          this.menus = this.getMenu('');
        }
      })
    );
  }

  getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
