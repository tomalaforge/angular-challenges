import { appConfig } from './app/app.config';
import { TodosComponent } from './app/todos.component';

import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(TodosComponent, appConfig).catch((err) =>
  console.error(err),
);
