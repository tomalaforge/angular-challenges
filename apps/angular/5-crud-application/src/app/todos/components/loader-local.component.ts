import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-local-loader',
  template: `
    <div class="loader"><div class="loader_gradient"></div></div>
  `,
  styles: `
    .loader_gradient {
      width: 20px;
      --b: 8px;
      aspect-ratio: 1;
      border-radius: 50%;
      padding: 1px;
      background: conic-gradient(#0000 10%, #f03355) content-box;
      -webkit-mask: repeating-conic-gradient(
          #0000 0deg,
          #000 1deg 20deg,
          #0000 21deg 36deg
        ),
        radial-gradient(
          farthest-side,
          #0000 calc(100% - var(--b) - 1px),
          #000 calc(100% - var(--b))
        );
      -webkit-mask-composite: destination-in;
      mask-composite: intersect;
      animation: l4 1s infinite steps(10);
    }
    @keyframes l4 {
      to {
        transform: rotate(1turn);
      }
    }
  `,
})
export class AppLocalLoaderComponent {}
