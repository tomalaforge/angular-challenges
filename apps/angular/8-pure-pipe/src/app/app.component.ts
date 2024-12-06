import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'compute', standalone: true })
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number) {
    return `${name} - ${index}`;
  }
}
@Component({
  imports: [HeavyComputationPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ person | compute: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
