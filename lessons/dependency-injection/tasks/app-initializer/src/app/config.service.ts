import { Injectable } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  appTitle: string;
  theme: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _config: AppConfig = {
    apiUrl: 'NOT CONFIGURED',
    appTitle: 'NOT CONFIGURED',
    theme: 'light',
  };

  get config(): AppConfig {
    return this._config;
  }

  load(): Promise<void> {
    return fetch('/assets/config.json')
      .then((r) => r.json())
      .then((cfg: AppConfig) => {
        this._config = cfg;
      });
  }
}
