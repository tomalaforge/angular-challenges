import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
    MatInputModule,
    LetDirective,
    JsonPipe,
  ],
  template: `
    <img src="{{ photo.url_q }}" alt="{{ photo.title }}" class="image" />
    {{ photo | json }}
  `,
  // providers: [provideComponentStore(PhotoStore)],
  host: {
    class: 'p-5 block',
  },
})
export default class DetailComponent {
  @Input({ required: true }) photo!: Photo;
  // store = inject(PhotoStore);
  // readonly vm$ = this.store.vm$;

  // search = new FormControl();

  // ngOnInit(): void {
  //   this.store.search(
  //     this.search.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
  //   );
  // }

  // trackById(index: number, photo: Photo) {
  //   return photo.id;
  // }
}
