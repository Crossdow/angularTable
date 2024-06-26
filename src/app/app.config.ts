import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {InMemoryScrollingFeature, provideRouter, withInMemoryScrolling} from "@angular/router";
import {APP_ROUTES} from "./app.routes";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(APP_ROUTES, inMemoryScrollingFeature),
    importProvidersFrom(MatDialogModule, HttpClientModule)
  ]
};
