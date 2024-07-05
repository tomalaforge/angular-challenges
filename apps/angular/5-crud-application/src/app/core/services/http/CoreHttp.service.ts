import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Core HTTP Service providing basic CRUD operations against a predefined base URL.
 * Utilizes Angular's HttpClient for HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  private readonly http = inject(HttpClient); // Injection of the HttpClient service.
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com'; // Base URL for all HTTP requests.

  /**
   * Performs a GET request to the specified URL and returns an Observable of the response type.
   * @param url The URL path to append to the base URL for the GET request.
   * @returns An Observable of the generic type T.
   */
  get<T = unknown>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }

  /**
   * Performs a POST request to the specified URL with the provided body and returns an Observable of the response type.
   * @param url The URL path to append to the base URL for the POST request.
   * @param body The body of the POST request.
   * @returns An Observable of the generic type T.
   */
  post<T = unknown>(url: string, body: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  /**
   * Performs a PUT request to the specified URL with the provided body and returns an Observable of the response type.
   * @param url The URL path to append to the base URL for the PUT request.
   * @param body The body of the PUT request.
   * @returns An Observable of the generic type T.
   */
  put<T = unknown>(url: string, body: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, body);
  }

  /**
   * Performs a DELETE request to the specified URL and returns an Observable of the response type.
   * @param url The URL path to append to the base URL for the DELETE request.
   * @returns An Observable of the generic type T.
   */
  delete<T = unknown>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  }
}
