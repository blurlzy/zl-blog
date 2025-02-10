import { Routes } from '@angular/router';

// screens
import { BlogHomeComponent } from './screens/blog-home.component';

// routes for blog module
export const blogRoutes: Routes = [
  { path: '', component: BlogHomeComponent },
];