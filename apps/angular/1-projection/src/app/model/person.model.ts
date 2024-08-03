import { EntityWithId } from './entity-with-id.model';

export interface Person extends EntityWithId {
  readonly firstName: string;
  readonly lastName: string;
}
