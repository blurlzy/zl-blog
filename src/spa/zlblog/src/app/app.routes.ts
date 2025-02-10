import { Routes } from '@angular/router';

// layout
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
	{
		path: '', 
		component: MainLayoutComponent,
		children: [
			{
				path: '', loadChildren: () => import('./modules/blog/blog.routes').then(m => m.blogRoutes)
			}
		]
	}
];
