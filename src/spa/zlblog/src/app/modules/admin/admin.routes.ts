import { Routes } from '@angular/router';
// auth0
import { authGuardFn } from '@auth0/auth0-angular';
// screens
import {  BlogEditorComponent } from './screens/blog-editor.component';

// routes for admin module
export const adminRoutes: Routes = [ 
	{ path: '', component: BlogEditorComponent, canActivate: [authGuardFn] },	
];