import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '@entities/todo';

interface IGetAllSuccess {
	todos: Todo.Entity[];
}

interface IGetAllError {
	error: HttpErrorResponse;
}

interface IToggleCompleted {
	id: number;
	completed: boolean;
}

interface IDelete {
	id: number;
}

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
