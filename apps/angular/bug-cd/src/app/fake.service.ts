import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakeServiceService {
  getInfoFromBackend = () => of('Client app').pipe(delay(500));
}
