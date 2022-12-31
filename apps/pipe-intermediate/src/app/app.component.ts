import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compute',
  pure: true,
  standalone: true,
})
export class ComputePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, funcName: 'showName' | 'isAllowed'): string {
    return funcName === 'isAllowed'
      ? this.isAllowed(value.age, value.isFirst)
      : this.showName(value.name, value.index);
  }

  private showName(name: string, index: number) {
    return `${name} - ${index}`;
  }

  private isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}

@Component({
  standalone: true,
  imports: [NgFor, ComputePipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ { name: person?.name, index } | compute : 'showName' }}
      {{ { age: person?.age, isFirst } | compute : 'isAllowed' }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
