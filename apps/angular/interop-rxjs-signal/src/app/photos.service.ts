import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photo.model';

export interface FlickrAPIResponse {
  photos: {
    pages: number;
    photo: Photo[];
  };
}

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private http = inject(HttpClient);

  public searchPublicPhotos(
    searchTerm: string,
    page: number,
  ): Observable<FlickrAPIResponse> {
    return this.http.get<FlickrAPIResponse>(
      'https://www.flickr.com/services/rest/',
      {
        params: {
          tags: searchTerm,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tag_mode: 'all',
          media: 'photos',
          per_page: '30',
          page,
          extras: 'tags,date_taken,owner_name,url_q,url_m',
          api_key: 'c3050d39a5bb308d9921bef0e15c437d',
        },
      },
    );
  }
}
