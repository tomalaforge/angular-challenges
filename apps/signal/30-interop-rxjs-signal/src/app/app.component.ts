import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoStore } from './list/photos.store';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <router-outlet />
  `,
  styles: [''],
  providers: [PhotoStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
