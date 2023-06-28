import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  sendTitle(title: string) {
    console.log(`${title} has been sent !!!`);
  }
}
