import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, concatMap, map } from 'rxjs';
import { FetchDataService } from './fetching-data.service';

@Component({
  imports: [FormsModule, JsonPipe],
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
  private fetchingDataService = inject(FetchDataService);

  ngOnInit() {
    this.submit$
      .pipe(
        map(() => this.input),
        concatMap((value) => this.fetchingDataService.fetchData(value)),
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
