/* eslint-disable @typescript-eslint/ban-types */
import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type FunctionNames = keyof typeof PersonUtils;
type FunctionParams = Parameters<(typeof PersonUtils)[FunctionNames]>;

type FirstArg = FunctionParams extends [infer F, ...unknown[]] ? F : never;
type LastArg = FunctionParams extends [unknown, ...infer L] ? L : never;

@Pipe({
  name: 'utility',
  standalone: true,
})
export class UtilityPipe implements PipeTransform {
  transform(
    value: FirstArg,
    functionName: FunctionNames,
    ...args: LastArg
  ): unknown {
    return (PersonUtils[functionName] as Function)(value, ...args);
  }
}
