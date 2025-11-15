import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrappFn',
})
export class WrapperUtilsPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
}
