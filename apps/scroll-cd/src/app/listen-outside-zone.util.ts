import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';

export function listenOutsideZone(
  target: HTMLElement | Window | Document,
  type: string,
  listener: EventListener
): () => void {
  getZoneUnPatchedApi(target, 'addEventListener').call(target, type, listener);
  return () => {
    getZoneUnPatchedApi(target, 'removeEventListener').call(
      target,
      type,
      listener
    );
  };
}
