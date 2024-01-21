import {
  AfterContentInit,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent],
  selector: 'app-home',
  template: `
    <div
      id="top"
      class="top-0 flex h-40 flex-col items-end gap-3 bg-red-300 text-center">
      <div class="fixed flex gap-3">
        Top
        <nav-button href="/home" ref="section1" class="">Section 1</nav-button>
        <nav-button href="/home" ref="section2" class="">Section 2</nav-button>
        <nav-button href="/home" ref="section3" class="">Section 3</nav-button>
      </div>
      <nav-button href="/foo" class="fixed left-1/2 top-3">
        Go to Foo Page
      </nav-button>
    </div>
    <div id="section1" class="h-screen bg-gray-500 text-center text-2xl">
      I am section 1
    </div>
    <div id="section2" class="h-screen bg-blue-300 text-center text-2xl">
      I am section 2
    </div>
    <div id="section3" class="h-screen bg-purple-300 text-center text-2xl">
      I am section 3
    </div>
    <div id="bottom" class="bottom-0 h-12 bg-red-300 text-center">Bottom</div>
    <div class="fixed bottom-0">
      @switch (section()) {
        @case ('top') {
          <nav-button href="/home" ref="bottom">Go bottom</nav-button>
        }
        @case ('bottom') {
          <nav-button href="/home" ref="top">Go top</nav-button>
        }
        @default {
          <nav-button href="/home" ref="bottom">Go bottom</nav-button>
        }
      }
    </div>
  `,
})
export class HomeComponent implements AfterContentInit {
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private el: ElementRef = inject(ElementRef);
  section = signal<string>('top');

  ngAfterContentInit(): void {
    this.activeRoute.fragment.subscribe({
      next: (res) => {
        if (res) {
          this.goToSection(res);
          this.section.set(res);
        }
      },
    });
  }
  goToSection(fragment: string) {
    //const element = this.el.nativeElement.querySelector(`#${fragment}`);
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
