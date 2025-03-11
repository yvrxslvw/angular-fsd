import { Routes } from '@angular/router';
import { adminGuard } from '@shared/guards';
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
				title: 'Пользователи',
				path: 'users',
				loadComponent: () => import('../pages/users').then((c) => c.UsersPage),
			},
			{
				title: 'Посты',
				path: 'posts',
				loadComponent: () => import('../pages/posts').then((c) => c.PostsPage),
			},
			{
				title: 'Роли',
				path: 'roles',
				canActivate: [adminGuard],
				loadComponent: () => import('../pages/roles').then((c) => c.RolesPage),
			},

			{
				path: '**',
				redirectTo: '/',
			},
		],
	},
];
