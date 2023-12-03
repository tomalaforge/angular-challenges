import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';
import { TodosComponent } from './app/todos.component';

bootstrapApplication(TodosComponent, appConfig).catch((err) =>
  console.error(err),
);
