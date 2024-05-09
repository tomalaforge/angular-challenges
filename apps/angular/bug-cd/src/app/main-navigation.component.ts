import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeServiceService } from './fake.service';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  // There are two different changes in this file that both individually fix
  // the behavior. The change here is the one I discovered first, although it
  // isn't really the core problem.
  // I found this fix by switching from ngFor to @for, and it was a surprise.
  // I was just trying to modernize the code, and I was surprised to see it
  // suddenly working. I was confused why changing the syntax would fix the
  // issue, but then I realized that "track" was a behavioral change, not just
  // a syntactic change.
  // Note that changing to the signal input had no effect, and the problem could
  // have been resolved with the ngFor directive if I had used the trackBy.
  // The true source of the problem was in the other component.
  template: `
    @for (menu of menus(); track menu.name) {
      <a
        class="rounded-md border px-4 py-2"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
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
export class NavigationComponent {
  menus = input.required<MenuItem[]>();
}

@Component({
  standalone: true,
  imports: [NavigationComponent],
  // The root bug was the use of a method call in the template. The code was
  // re-generating the menu items on every change detection cycle, which was
  // causing the change detection cycle to re-run each time. Each change
  // detection cycle would re-run the method, which would re-generate the menu,
  // which would cause the change detection cycle to re-run again. This would
  // continue indefinitely.
  // The solution was to build the array once in the TypeScript code and then
  // use that array in the template. This way, the array would not be
  // re-generated on each change detection cycle, and the change detection cycle
  // would not re-run indefinitely.
  // Note that changing to use signals instead of the AsyncPipe and removing the
  // extraneous ngIf layer had no effect on the behavior.
  //
  // Overall, this app is the best example I've seen of why trackBy and not
  // using method calls in the template are important.
  template: `
    <app-nav [menus]="menus()" />
  `,
  host: {},
})
export class MainNavigationComponent {
  private readonly fakeBackend = inject(FakeServiceService);
  private readonly infos = toSignal(this.fakeBackend.getInfoFromBackend());
  readonly menus = computed(() => {
    const infos = this.infos();
    return infos ? this.getMenu(infos) : [];
  });

  private getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
