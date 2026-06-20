import { Routes } from '@angular/router';

// layouts
import { MainLayout } from './layouts/main-layout';

export const routes: Routes = [
      	{
		path: '',
		component: MainLayout,
		children: [
			{
				// blog module
				path: '', loadChildren: () => import('./modules/blog/blog.routes').then(m => m.blogRoutes)
			}
		]
	},
	// {
	// 	path: 'admin',
	// 	component: AdminLayout,
	// 	children: [
	// 		{
	// 			// admin module (auth required)
	// 			path: '', loadChildren: () => import('./modules/admin/admin.routes').then(m => m.adminRoutes)
	// 		}
	// 	]
	// },
	{ path: '**',   redirectTo: '404', pathMatch: 'full' } // redirect to 404 screen (not found) in the default (blog) module
];
