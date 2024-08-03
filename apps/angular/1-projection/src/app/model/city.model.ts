import { EntityWithId } from './entity-with-id.model';

export interface City extends EntityWithId {
  readonly name: string;
  readonly country: string;
}
