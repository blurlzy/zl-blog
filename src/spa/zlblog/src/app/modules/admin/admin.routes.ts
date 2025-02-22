import { Routes } from '@angular/router';
// auth0
import { authGuardFn } from '@auth0/auth0-angular';
// screens
import { AdminHomeComponent } from './screens/admin-home.component';
import { AdminBlogFormComponent } from './screens/admin-blog-form.component';
import { AdminBlogPreviewComponent } from './screens/admin-blog-preview.component';
import { AdminHomeImagesComponent } from './screens/admin-home-images.component';
import { AdminHomeCommentComponent } from './screens/admin-home-comment.component';


// routes for admin module
export const adminRoutes: Routes = [ 
	{ path: '', component: AdminHomeComponent, canActivate: [authGuardFn] },	
	{ path: 'create', component: AdminBlogFormComponent, canActivate: [authGuardFn] },	
	{ path: 'edit/:id', component: AdminBlogFormComponent, canActivate: [authGuardFn] },
	{ path: 'preview/:id', component: AdminBlogPreviewComponent, canActivate: [authGuardFn] },
	{ path: 'images', component: AdminHomeImagesComponent, canActivate: [authGuardFn] },	
	{ path: 'comments', component: AdminHomeCommentComponent, canActivate: [authGuardFn] }
];