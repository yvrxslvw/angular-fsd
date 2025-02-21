import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IDelete, IGetAllError, IGetAllSuccess, IToggleCompleted } from './todo.interfaces';

export const todoApiActions = createActionGroup({
	source: 'Todo API',
	events: {
		getAll: emptyProps(),
		getAllSuccess: props<IGetAllSuccess>(),
		getAllError: props<IGetAllError>(),
	},
});

export const todoActions = createActionGroup({
	source: 'Todo',
	events: {
		toggleCompleted: props<IToggleCompleted>(),
		delete: props<IDelete>(),
	},
});
