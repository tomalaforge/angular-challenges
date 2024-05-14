import { Pipe, PipeTransform } from '@angular/core';
import { LoadingState, isCustomError } from '../state/loading.feature';

@Pipe({
  name: 'loadingStatePipe',
  standalone: true,
})
export class LoadingStatePipe implements PipeTransform {
  transform(state: LoadingState): { loading: boolean; error?: string } {
    const obj = {
      loading: state === 'loading' ? true : false,
    };

    if (isCustomError(state)) {
      return {
        ...obj,
        error: state.error,
      };
    }

    return obj;
  }
}
