import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeServiceService } from './fake.service';
import { NavMenuPipe } from './nav-menu.pipe';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (menu of menus; track menu) {
      <a
        class="rounded-md border px-4 py-2"
        routerLinkActive="isSelected"
        [routerLink]="menu.path">
        {{ menu.name }}
      </a>
    }
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
export class NavigationComponent implements AfterViewInit {
  @Input() menus!: MenuItem[];

  ngAfterViewInit(): void {
    console.log(this.menus);
  }
}

@Component({
  standalone: true,
  imports: [NavigationComponent, AsyncPipe, NavMenuPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <ng-container *ngIf="info$ | async as info">
      <ng-container *ngIf="info !== null; else noInfo">
        <app-nav [menus]="info | navMenu" />
      </ng-container>
    </ng-container>

    <ng-template #noInfo>
      <app-nav [menus]="'' | navMenu" />
    </ng-template> -->

    @if (info$ | async; as info) {
      <app-nav [menus]="info | navMenu" />
    } @else {
      <app-nav [menus]="'' | navMenu" />
    }
  `,
  host: {},
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);

  readonly info$ = this.fakeBackend.getInfoFromBackend();

  /**
   * The change detection bug is caused by this template function,
   * it is used to pass data to input property 'menus' of app-nav component,
   * BUT it is a template function and it is called every time Angular change detection runs.
   * As a result, 'menus' array input ref is changed every time causing the ngFor directive to
   * rerender the elements. Inside ngFor there is 'routerLinkActive' directive where Angular source code
   * is calling this.cdr.markForCheck inside a microTask, which triggers a new cd cycle.
   * The new change detection cycle triggers getMenu function execution thus an infinite loop causing
   * the application crash. The solution could be instead of relying on this kind of functions,
   * creating a pure pipe where the results are memoized.
   * @param prop
   * @returns
   */
  getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
