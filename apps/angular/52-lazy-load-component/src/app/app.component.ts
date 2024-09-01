import { Component, signal, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @if (topLoaded()) {
        <app-top />
      } @else {
        <app-placeholder />
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="loadTopComponent()">
          Load Top
        </button>
      }
    </div>
  `,
})
export class AppComponent {
  topLoaded = signal(false);

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnInit() {
    // Initialize the component container
    if (this.topLoaded()) {
      this.loadTopComponent();
    }
  }

  async loadTopComponent() {
    // Dynamically import the TopComponent
    const { TopComponent } = await import('./top.component');
    // Create a component factory for TopComponent
    const componentFactory = this.container.createComponent(TopComponent);
    this.topLoaded.set(true);
  }

}
