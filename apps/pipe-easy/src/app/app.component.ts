import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'compute',
  pure: true,
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: { name: string; index: number }) {
    return `${value?.name} - ${value?.index}`;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgFor, HeavyComputationPipe],
  standalone: true,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
