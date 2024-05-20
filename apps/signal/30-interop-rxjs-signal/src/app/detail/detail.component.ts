import { DatePipe } from '@angular/common';
import { Component, Input as RouterInput } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Photo } from '../photo.model';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './detail.component.html',
  host: {
    class: 'p-5 block',
  },
})
export default class DetailComponent {
  @RouterInput({
    required: true,
    transform: (value: string) => JSON.parse(decodeURIComponent(value)),
  })
  photo!: Photo;
}
