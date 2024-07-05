import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { App5StateService } from '../state/app-state.service';

let requestCounter = 0; // Tracks the number of active HTTP requests.

/**
 * Interceptor to manage loading states based on active HTTP requests.
 * It increments a request counter on each request and decrements it upon completion.
 * For DELETE requests, it extracts the ID from the URL to set a specific loading state.
 * For other requests, it attempts to extract a Todo ID from the request body for the same purpose.
 * Once all requests are completed, and no errors are present, it sets the application state to ready.
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  requestCounter++; // Increment the request counter.
  const stateService = inject(App5StateService); // Inject the state service to manage loading states.

  if (req.method === 'DELETE') {
    // Extract the id from the URL for DELETE requests.
    const id = req.url.split('/').pop();
    id ? stateService.setLoading(+id) : stateService.setLoading(null);
  } else {
    // Attempt to extract a Todo ID from the request body for other request types.
    const todoBody: Todo = req.body as Todo;
    todoBody
      ? stateService.setLoading(todoBody.id)
      : stateService.setLoading(null);
  }

  return next(req).pipe(
    finalize(() => {
      requestCounter--; // Decrement the request counter on request completion.
      // If no more active requests and no errors, set the application state to ready.
      if (requestCounter === 0 && !stateService.isStatusError())
        stateService.setReady();
    }),
  );
};
