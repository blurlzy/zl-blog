import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
// http module
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withFetch, withInterceptors } from '@angular/common/http';
// auth0 integration
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { AllowList } from './auth/auth0-config';

// quill editor module
import { provideQuillConfig } from 'ngx-quill/config';
// env
import { environment } from '../environments/environment';
// application root routes
import { routes } from './app.routes';

// app config
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    // auth0 config
    provideAuth0({
      domain: environment.auth0Config.tenantDomain,
      clientId: environment.auth0Config.clientId,
      authorizationParams: {
        audience: environment.auth0Config.audience,
        redirect_uri: `${window.location.origin}${environment.auth0Config.callbackRedirectUri}`
      },
      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [
          ...AllowList
        ],
      }
    }),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      // auth0 interceptor
      withInterceptors([authHttpInterceptorFn])
    ),
    provideQuillConfig({
      
    }), 
    provideAnimationsAsync()
  ]
};
