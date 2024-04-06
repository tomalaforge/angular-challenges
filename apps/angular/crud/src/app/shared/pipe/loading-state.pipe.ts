import { Pipe, PipeTransform } from '@angular/core';
import { LoadingState } from '../state/loading.feature';

@Pipe({
  name: 'loadingStatePipe',
  standalone: true,
})
export class LoadingStatePipe implements PipeTransform {
  transform(state: LoadingState): { loading: boolean; error?: string } {
    const obj = {
      loading: state === 'loading' ? true : false,
    };

    if (typeof state === 'object' && 'error' in state) {
      return {
        ...obj,
        error: state.error,
      };
    }

    return obj;
  }
}
