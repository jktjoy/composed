import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';
import * as Composer from './composer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),

    // NgRx stuff
    provideStore(),

    provideState(Composer.COMPOSER_FEATURE_KEY, Composer.ComposerReducer),


    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
  ],
};
