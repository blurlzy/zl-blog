import { Routes } from '@angular/router';

// screens
import { BlogHomeComponent } from './screens/blog-home.component';
import { BlogDetailComponent } from './screens/blog-detail.component';
import { AboutComponent } from './screens/about.component';
import { NotFoundComponent } from '../../core/components/not-found.component';

// routes for blog module
export const blogRoutes: Routes = [
  { path: '', component: BlogHomeComponent },
  { path: 'blogs/:id', component: BlogDetailComponent },
  { path: 'blogs/tags/:tag', component: BlogHomeComponent },
  { path: 'about', component: AboutComponent },
  // system routes
  { path: '404', component: NotFoundComponent }
];