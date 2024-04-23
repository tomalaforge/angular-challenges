import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menus',
  standalone: true,
})
export class MenusPipe implements PipeTransform {
  transform(prop: string) {
    return this.getMenu(prop);
  }

  getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
