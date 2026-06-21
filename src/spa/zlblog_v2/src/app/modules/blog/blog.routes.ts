import { Routes } from '@angular/router';

// screens
import { BlogHome } from './screens/blog-home';
import { NotFound } from '../../core/components/not-found';

// routes for blog module
export const blogRoutes: Routes = [
  { path: '', component: BlogHome },

  // 404 route (not found)
  { path: '404', component: NotFound }
];