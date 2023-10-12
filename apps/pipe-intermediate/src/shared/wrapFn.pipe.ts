import { Pipe, PipeTransform } from '@angular/core';
type CallbackFunction = (arg1: any, arg2: any) => string;
@Pipe({ name: 'wrapFn', standalone: true })
export class WrapFunction implements PipeTransform {
  transform(
    callback: CallbackFunction,
    arg1: string | number,
    arg2: number | boolean
  ) {
    return callback(arg1 as string | number, arg2 as number | boolean);
  }
}
