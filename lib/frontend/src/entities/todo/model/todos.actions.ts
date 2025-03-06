import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const todosApiActions = {
	getAll: createActionGroup({
		source: 'Todos API',
		events: {
			request: emptyProps(),
			fulfill: props<Todo.Action.GetAllFulfilled>(),
			reject: props<Todo.Action.GetAllRejected>(),
		},
	}),
};

export const todosActions = createActionGroup({
	source: 'Todos',
	events: {
		toggleCompleted: props<Todo.Action.ToggleCompleted>(),
		delete: props<Todo.Action.Delete>(),
	},
});
