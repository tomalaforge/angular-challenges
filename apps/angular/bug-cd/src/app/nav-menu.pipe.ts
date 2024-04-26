import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'navMenu', standalone: true })
export class NavMenuPipe implements PipeTransform {
  transform(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
