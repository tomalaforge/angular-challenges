import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FetchDataService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com';

  fetchData(value: string): Observable<unknown> {
    return this.http.get<unknown>(`${this.url}/${value}/1`).pipe(
      catchError((err) => {
        const errorMsg =
          err.error instanceof ErrorEvent
            ? `Client-side error: ${err.error.message}`
            : `Server-side error (${err.status}): ${err.message}`;

        console.warn(errorMsg);
        return of({ error: errorMsg });
      }),
    );
  }
}
