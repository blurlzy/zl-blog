import { Routes } from '@angular/router';

// layout
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				// blog module
				path: '', loadChildren: () => import('./modules/blog/blog.routes').then(m => m.blogRoutes)
			}
		]
	},
	{
		path: 'admin',
		component: AdminLayoutComponent,
		children: [
			{
				// admin module (auth required)
				path: '', loadChildren: () => import('./modules/admin/admin.routes').then(m => m.adminRoutes)
			}
		]
	},
	{ path: '**',   redirectTo: '404', pathMatch: 'full' } // redirect to 404 screen (not found) in the default (blog) module
];
