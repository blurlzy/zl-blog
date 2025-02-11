import { Routes } from '@angular/router';

// layout
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				// blog module
				path: '', loadChildren: () => import('./modules/blog/blog.routes').then(m => m.blogRoutes)
			},
			{
				// admin module (auth required)
				path: 'admin', loadChildren: () => import('./modules/admin/admin.routes').then(m => m.adminRoutes)
			}
		]
	}
];
