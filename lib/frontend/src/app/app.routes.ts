import { Routes } from '@angular/router';
import { MainLayoutWidget } from '@widgets/main-layout';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutWidget,
		children: [
			{
				title: 'Angular FSD',
				path: '',
				loadComponent: () => import('../pages/main').then((c) => c.MainPage),
			},

			{
				path: '**',
				redirectTo: '/',
			},
		],
	},
];
