import { Routes } from '@angular/router';

// screens
import { BlogHome } from './screens/blog-home';


// routes for blog module
export const blogRoutes: Routes = [
  { path: '', component: BlogHome },

  // system routes
  //{ path: '404', component: NotFoundComponent }
];