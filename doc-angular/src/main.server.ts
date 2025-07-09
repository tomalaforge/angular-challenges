import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { Shell } from './app/shell';

const bootstrap = () => bootstrapApplication(Shell, config);

export default bootstrap;
