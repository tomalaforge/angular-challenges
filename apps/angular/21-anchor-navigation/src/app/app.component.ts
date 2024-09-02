import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(private activatedRouter: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRouter.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scroll(fragment);
      }
    });
  }

  scroll(section: string) {
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
