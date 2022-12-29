import { Injectable } from '@angular/core';
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';

@Injectable({ providedIn: 'root' })
export class ZoneLessEventListener {
  listen(
    target: HTMLElement | Window | Document,
    type: string,
    listener: EventListener
  ): () => void {
    getZoneUnPatchedApi(target, 'addEventListener').call(
      target,
      type,
      listener
    );
    return () => {
      getZoneUnPatchedApi(target, 'removeEventListener').call(
        target,
        type,
        listener
      );
    };
  }
}
