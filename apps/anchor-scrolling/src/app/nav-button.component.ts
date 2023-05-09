/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a [routerLink]="href.split('#')[0]" [fragment]="href.split('#')[1]">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
  imports: [RouterLink],
})
export class NavButtonComponent implements OnInit, AfterViewInit {
  @Input() href = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    document.body.scrollIntoView();
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      try {
        if (fragment) {
          document
            .getElementById(fragment)
            ?.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
