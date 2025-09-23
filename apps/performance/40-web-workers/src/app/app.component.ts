import { Component, inject } from '@angular/core';
import { HeavyCalculationService } from './heavy-calculation.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  imports: [UnknownPersonComponent],
  providers: [HeavyCalculationService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />
    <button
      class="my-3 w-fit self-center rounded-md border border-white px-4 py-2 text-2xl text-white"
      (click)="discover()">
      Discover
    </button>
    <div class="p-1 text-white">Progress: {{ loadingPercentage() }}%</div>
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
