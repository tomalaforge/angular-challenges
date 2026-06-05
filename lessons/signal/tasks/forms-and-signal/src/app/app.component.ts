import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <h1 class="text-3xl">Shop</h1>
    <div class="w-[500px] ">
      <router-outlet />
    </div>
  `,
  host: {
    class: 'w-full flex justify-center flex-col items-center p-4 gap-10',
  },
})
export class AppComponent {}
