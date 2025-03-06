import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import { todosActions, todosApiActions } from './todos.actions';
import {
	deleteHandler,
	getAllFulfillHandler,
	getAllRejectHandler,
	getAllRequestHandler,
	toggleCompletedHandler,
} from './todos.handlers';

const initialState: Todo.State = {
	error: null,
	isLoading: false,
	todos: [],
};

export const todosSlice = createFeature({
	name: 'todos',
	reducer: createReducer(
		initialState,
		on(todosApiActions.getAll.request, getAllRequestHandler),
		on(todosApiActions.getAll.fulfill, getAllFulfillHandler),
		on(todosApiActions.getAll.reject, getAllRejectHandler),

		on(todosActions.toggleCompleted, toggleCompletedHandler),
		on(todosActions.delete, deleteHandler),
	),
});
