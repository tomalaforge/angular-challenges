import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'wrapFn' })
// I tried WrapFnPipe<Result> here instead of defining the Result type param
// over and over, and I was surprised that the type safety was lost!
export class WrapFnPipe implements PipeTransform {
  transform<Result, ARG>(fn: (arg: ARG) => Result, arg: ARG): Result;
  transform<Result, ARG1, ARG2>(
    fn: (arg1: ARG1, arg2: ARG2) => Result,
    arg1: ARG1,
    arg2: ARG2,
  ): Result;
  transform<Result, ARG1, ARG2, ARG3>(
    fn: (arg1: ARG1, arg2: ARG2, arg3: ARG3) => Result,
    arg1: ARG1,
    arg2: ARG2,
    arg3: ARG3,
  ): Result;
  transform<Result, ARG1, ARG2, ARG3, ARG4>(
    fn: (arg1: ARG1, arg2: ARG2, arg3: ARG3, arg4: ARG4) => Result,
    arg1: ARG1,
    arg2: ARG2,
    arg3: ARG3,
    arg4: ARG4,
  ): Result;
  transform<Result, ARG1, ARG2, ARG3, ARG4>(
    fn: (
      arg1: ARG1,
      arg2: ARG2,
      arg3: ARG3,
      arg4: ARG4,
      ...args: unknown[]
    ) => Result,
    arg1: ARG1,
    arg2: ARG2,
    arg3: ARG3,
    arg4: ARG4,
    ...args: unknown[]
  ): Result;

  transform<Result>(
    fn: (...a: unknown[]) => Result,
    ...args: unknown[]
  ): Result {
    return fn(...args);
  }
}
