import { Routes } from '@angular/router';
import { MainLayoutWidget } from '@widgets/main-layout';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutWidget,
		children: [
			{
				path: '**',
				redirectTo: '/',
			},
		],
	},
];
