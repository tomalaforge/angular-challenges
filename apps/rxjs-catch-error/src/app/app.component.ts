import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, concatMap, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  template: `
    <div class="form-container">
      <span
        >possible values: posts, comments, albums, photos, todos, users</span
      >
    </div>
    <form class="form-container" (ngSubmit)="submit$$.next()">
      <input
        type="text"
        placeholder="Enter text"
        [(ngModel)]="input"
        name="action" />
      <button>Fetch</button>
    </form>
    <div class="response">
      {{ response | json }}
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  submit$$ = new Subject<void>();
  input = '';
  response: unknown;
  private destroyRef = inject(DestroyRef);
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.submit$$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => this.input),
        concatMap((value) =>
          this.http.get(`https://jsonplaceholder.typicode.com/${value}/1`)
        )
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.response = value;
        },
        error: (error) => {
          console.log(error);
          this.response = error;
        },
        complete: () => console.log('done'),
      });
  }
}
