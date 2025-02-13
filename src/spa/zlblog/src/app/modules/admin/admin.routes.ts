import { Routes } from '@angular/router';
// auth0
import { authGuardFn } from '@auth0/auth0-angular';
// screens
import { AdminHomeComponent } from './screens/admin-home.component';
import { BlogEditorComponent } from './screens/blog-editor.component';

// routes for admin module
export const adminRoutes: Routes = [ 
	{ path: '', component: AdminHomeComponent, canActivate: [authGuardFn] },	
	{ path: 'create', component: BlogEditorComponent, canActivate: [authGuardFn] },	
	{ path: 'edit/:id', component: BlogEditorComponent, canActivate: [authGuardFn] },
];