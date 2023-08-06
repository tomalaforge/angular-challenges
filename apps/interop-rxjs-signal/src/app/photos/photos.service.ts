import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Photo } from './photo.model';
import { Filter } from '../shared/state/filter.feature';

export interface FlickrAPIResponse {
  photos: {
    pages: number;
    photo: Photo[];
  };
}

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private readonly http = inject(HttpClient);

  getByFilter(filter: Filter): Observable<{
    photos: Photo[];
    totalPages: number;
  }> {
    return this.http
      .get<FlickrAPIResponse>('https://www.flickr.com/services/rest/', {
        params: {
          tags: filter.query,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tag_mode: 'all',
          media: 'photos',
          per_page: '30',
          page: filter.page,
          extras: 'tags,date_taken,owner_name,url_q,url_m',
          api_key: 'c3050d39a5bb308d9921bef0e15c437d',
        },
      })
      .pipe(
        map(({ photos }) => ({
          photos: photos.photo,
          totalPages: photos.pages,
        }))
      );
  }
}
