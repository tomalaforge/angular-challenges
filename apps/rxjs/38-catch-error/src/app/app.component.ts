import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, catchError, concatMap, map, of } from 'rxjs';

interface ApiResponse {
  data?: unknown;
  error?: string;
  status: 'success' | 'error';
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="content">
        <h1>API Data Fetcher</h1>

        <div class="info-box">
          <h3>Available Endpoints:</h3>
          <div class="endpoints">
            <span class="endpoint" *ngFor="let endpoint of validEndpoints">
              {{ endpoint }}
            </span>
          </div>
        </div>

        <form class="form" (ngSubmit)="submit$.next()">
          <input
            type="text"
            [class]="'input ' + (response?.status || '')"
            placeholder="Enter endpoint..."
            [(ngModel)]="input"
            name="action" />
          <button type="submit" class="button" [disabled]="!input.trim()">
            Fetch Data
          </button>
        </form>

        <div
          *ngIf="response"
          class="response"
          [class.error]="response.status === 'error'"
          [class.success]="response.status === 'success'">
          <h3>{{ response.status === 'success' ? 'Response' : 'Error' }}</h3>
          <pre>{{ response.data || response.error | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  submit$ = new Subject<void>();
  input = '';
  response?: ApiResponse;

  validEndpoints = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];

  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  constructor() {
    this.submit$
      .pipe(
        map(() => this.input.trim()),
        concatMap((value) =>
          this.http.get(`https://jsonplaceholder.typicode.com/${value}/1`).pipe(
            map(
              (data): ApiResponse => ({
                data,
                status: 'success',
              }),
            ),
            catchError((error: HttpErrorResponse) =>
              of({
                error: `Failed to fetch data: ${error.message}`,
                status: 'error' as const,
              }),
            ),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        console.log(response);
        this.response = response;
      });
  }
}
