import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-child',
  template: `
    <mat-card>
      <mat-card-content>
        <h2 class="my-3">Slider configuration</h2>

        <section class="flex items-center">
          <mat-form-field class="m-4 w-full max-w-[180px]">
            <mat-label>Value</mat-label>
            <input
              matInput
              type="number"
              [(ngModel)]="value"
              id="input-value" />
          </mat-form-field>
          <mat-form-field class="m-4 w-full max-w-[180px]">
            <mat-label>Min value</mat-label>
            <input matInput type="number" [(ngModel)]="min" id="input-min" />
          </mat-form-field>
          <mat-form-field class="m-4 w-full max-w-[180px]">
            <mat-label>Max value</mat-label>
            <input matInput type="number" [(ngModel)]="max" id="input-max" />
          </mat-form-field>
          <mat-form-field class="m-4 w-full max-w-[180px]">
            <mat-label>Step size</mat-label>
            <input matInput type="number" [(ngModel)]="step" id="input-step" />
          </mat-form-field>
        </section>

        <section class="flex items-center">
          <mat-checkbox [(ngModel)]="showTicks">Show ticks</mat-checkbox>
        </section>

        <section class="flex items-center">
          <mat-checkbox [(ngModel)]="thumbLabel">Show thumb label</mat-checkbox>
        </section>

        <section class="flex items-center">
          <mat-checkbox [(ngModel)]="disabled">Disabled</mat-checkbox>
        </section>
      </mat-card-content>
    </mat-card>

    <mat-card class="flex">
      <mat-card-content>
        <div class="flex gap-10">
          <button mat-mini-fab (click)="back()">
            <mat-icon>arrow_back_ios</mat-icon>
          </button>
          <mat-slider
            class="m-4"
            [disabled]="disabled"
            [max]="max"
            [min]="min"
            [step]="step"
            [discrete]="thumbLabel"
            [showTickMarks]="showTicks">
            <input matSliderThumb [(ngModel)]="value" />
          </mat-slider>
          <button mat-mini-fab (click)="forward()">
            <mat-icon>arrow_forward_ios</mat-icon>
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .mat-mdc-slider {
        max-width: 300px;
        width: 100%;
      }

      .mat-mdc-card + .mat-mdc-card {
        margin-top: 8px;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatIconModule,
  ],
})
export class ChildComponent {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  back() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
    }
  }

  forward() {
    if (this.value + this.step <= this.max) {
      this.value += this.step;
    }
  }
}
