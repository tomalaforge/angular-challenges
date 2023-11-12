import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { providers } from './core/port/todo.providers';

export const todosConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), ...providers],
};
