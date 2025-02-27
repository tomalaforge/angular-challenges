import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeavyCalculationService } from './heavy-calculation.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  standalone: true,
  imports: [CommonModule, UnknownPersonComponent],
  providers: [HeavyCalculationService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />
    <button
      class="my-3 w-fit self-center rounded-md border border-white px-4 py-2
             text-2xl text-white transition-all hover:bg-white/10
             focus:outline-none focus:ring-2 focus:ring-white
             focus:ring-offset-2 focus:ring-offset-[#1f75c0]
             disabled:opacity-50"
      (click)="discover()"
      [disabled]="loadingPercentage() > 0 && loadingPercentage() < 100">
      {{
        loadingPercentage() === 0
          ? 'Discover'
          : loadingPercentage() === 100
            ? 'Merry Christmas!'
            : 'Discovering...'
      }}
    </button>
    <div class="p-1 text-center text-xl text-white">
      Progress: {{ loadingPercentage() }}%
    </div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent {
  private heavyCalculationService = inject(HeavyCalculationService);
  readonly loadingPercentage = this.heavyCalculationService.loadingPercentage;

  discover() {
    this.heavyCalculationService.startLoading();
  }
}
