import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  standalone: true,
  imports: [CommonModule, UnknownPersonComponent],
  selector: 'app-root',
  template: `
    <unknown-person [step]="workerLoadingPercentage()" class="relative grow" />
    <button
      class="my-3 w-fit self-center rounded-md border border-white px-4 py-2 text-2xl text-white"
      (click)="discover()">
      Discover
    </button>
    <div class="p-1 text-white">Progress: {{ workerLoadingPercentage() }}%</div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent {
  readonly workerLoadingPercentage = signal(0);
  discover() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(
        new URL('../app/app.worker.ts', import.meta.url),
      );
      worker.onmessage = ({ data }) => {
        this.workerLoadingPercentage.set(data);
      };
      worker.postMessage('start');
    }
  }
}
