import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrimeService } from './prime-number.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  standalone: true,
  imports: [CommonModule, UnknownPersonComponent],
  providers: [PrimeService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />
    <button
      class="border border-white rounded-md px-4 py-2 text-white w-fit self-center text-2xl my-3"
      (click)="discover()">
      Discover
    </button>
    <div class="text-white p-1">Progress: {{ loadingPercentage() }}%</div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent {
  primeService = inject(PrimeService);

  loadingPercentage = this.primeService.loadingPercentage;

  discover() {
    this.primeService.calculatePrimeLength();
  }
}
