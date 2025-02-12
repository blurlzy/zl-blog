import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router';

// application root routes
import { routes } from './app.routes';

// quill editor module
import { provideQuillConfig } from 'ngx-quill/config';
import Counter from './counter'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideQuillConfig({
      // customModules: [{
      //   implementation: Counter,
      //   path: 'modules/counter'
      // }],      
      // customOptions: [{
      //   import: 'formats/font',
      //   whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      // }]
    })
  ]
};
