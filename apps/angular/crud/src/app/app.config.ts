import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), TodoService],
};
