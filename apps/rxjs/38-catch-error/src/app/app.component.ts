import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, concatMap, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  template: `
    <div class="form-container">
      <span>
        possible values: posts, comments, albums, photos, todos, users
      </span>
    </div>
    <form class="form-container" (ngSubmit)="submit$.next()">
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
export class AppComponent implements OnInit {
  submit$ = new Subject<void>();
  input = '';
  response: unknown;

  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  ngOnInit() {
    this.submit$
      .pipe(
        map(() => this.input),
        concatMap((value) =>
          this.http.get(`https://jsonplaceholder.typicode.com/${value}/1`),
        ),
        takeUntilDestroyed(this.destroyRef),
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
