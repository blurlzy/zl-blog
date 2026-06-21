import { Routes } from '@angular/router';
// auth0
import { authGuardFn } from '@auth0/auth0-angular';
// screens
import { AdminHome } from './screens/admin-home';
import { AdminBlogForm } from './screens/admin-blog-form';
import { AdminBlogPreview } from './screens/admin-blog-preview';
import { AdminHomeImages } from './screens/admin-home-images';
import { AdminHomeComments } from './screens/admin-home-comments';

// routes for admin module
// all routes are protected by auth guard, only authenticated users can access these routes
export const adminRoutes: Routes = [ 
	{ path: '', component: AdminHome, canActivate: [authGuardFn] },	
	{ path: 'create', component: AdminBlogForm, canActivate: [authGuardFn] },	
	{ path: 'edit/:id', component: AdminBlogForm, canActivate: [authGuardFn] },
	{ path: 'preview/:id', component: AdminBlogPreview, canActivate: [authGuardFn] },
	{ path: 'images', component: AdminHomeImages, canActivate: [authGuardFn] },	
	{ path: 'comments', component: AdminHomeComments, canActivate: [authGuardFn] }
];