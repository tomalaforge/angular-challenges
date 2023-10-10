import { Pipe, PipeTransform } from '@angular/core';
type CallbackFunction = (arg1: any, arg2: any) => any;
@Pipe({ name: 'wrapFn', standalone: true })
export class WrapFunction implements PipeTransform {
  transform(
    callback: CallbackFunction,
    arg1: string | number | boolean,
    arg2: string | number | boolean
  ) {
    return callback(arg1, arg2);
  }
}
