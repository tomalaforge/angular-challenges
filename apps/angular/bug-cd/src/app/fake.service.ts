import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class FakeServiceService {
  getInfoFromBackend = () => toSignal(of('Client app').pipe(delay(500)));
}
