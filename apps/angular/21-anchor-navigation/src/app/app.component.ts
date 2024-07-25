import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(private activatedRouter: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRouter.fragment.subscribe((fragment) => {
      if (fragment) {
        this.goToElement(fragment);
      }
    });
  }

  goToElement(selector: string | null) {
    if (selector && document) {
      document.getElementById(selector)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
