import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { todosSlice } from '@entities/todo';
import { MainLayoutWidget } from '@widgets/main-layout';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutWidget,
		children: [
			{
				title: 'Главная',
				path: '',
				loadComponent: () => import('../pages/main').then((c) => c.MainPage),
			},
			{
				title: 'О нас',
				path: 'about',
				loadComponent: () => import('../pages/about').then((c) => c.AboutPage),
			},
			{
				title: 'Список дел',
				path: 'todos',
				loadComponent: () => import('../pages/todos').then((c) => c.TodosPage),
				providers: [provideState(todosSlice)],
			},

			{
				path: '**',
				redirectTo: '/',
			},
		],
	},
];
