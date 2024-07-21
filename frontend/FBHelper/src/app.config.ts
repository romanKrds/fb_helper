import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgsContenteditableModule } from "@ng-stack/contenteditable";
import { provideMarkdown } from "ngx-markdown";

import { routes } from './app.routes';
import { environment } from "./environments/environment";
import { API_URL } from "./tokens";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
    importProvidersFrom(NgsContenteditableModule)
  ]
};
