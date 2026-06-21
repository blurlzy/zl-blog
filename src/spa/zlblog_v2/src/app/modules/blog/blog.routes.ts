import { Routes } from '@angular/router';

// screens
import { BlogHome } from './screens/blog-home';
import { BlogDetail } from './screens/blog-detail';
import { About } from './screens/about';
import { Contact } from './screens/contact';
import { NotFound } from '../../core/components/not-found';

// routes for blog module
export const blogRoutes: Routes = [
  { path: '', component: BlogHome },
  { path: 'blogs/:id', component: BlogDetail },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  // 404 route (not found)
  { path: '404', component: NotFound }
];