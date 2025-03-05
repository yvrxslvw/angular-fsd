import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const todoApiActions = createActionGroup({
	source: 'Todo API',
	events: {
		getAll: emptyProps(),
		getAllSuccess: props<Todo.Actions.GetAllSuccess>(),
		getAllError: props<Todo.Actions.GetAllError>(),
	},
});

export const todoActions = createActionGroup({
	source: 'Todo',
	events: {
		toggleCompleted: props<Todo.Actions.ToggleCompleted>(),
		delete: props<Todo.Actions.Delete>(),
	},
});
