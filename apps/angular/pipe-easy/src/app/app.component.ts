import { Component } from '@angular/core';
import { MyPipePipe } from './my-pipe.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    @for (person of persons; track $index) {
      <div>
        {{ person | myPipe: $index }}
      </div>
    }
  `,
  imports: [MyPipePipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
