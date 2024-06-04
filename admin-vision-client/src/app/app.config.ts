import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  withFetch,
  provideHttpClient,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(),
  ],
};
