import { createReducer, on } from '@ngrx/store';
import { todoActions, todoApiActions } from './todo.actions';
import { Todo } from './todo.model';

const initialState: Todo.State = {
	error: null,
	isLoading: false,
	todos: [],
};

export const todoReducer = createReducer(
	initialState,
	on(todoApiActions.getAll, (state): Todo.State => ({ ...state, isLoading: true })),
	on(todoApiActions.getAllSuccess, (state, { todos }): Todo.State => ({ ...state, todos, isLoading: false })),
	on(
		todoApiActions.getAllError,
		(state, { error }): Todo.State => ({
			...state,
			error,
			isLoading: false,
		}),
	),
	on(todoActions.toggleCompleted, (state, { id, completed }): Todo.State => {
		return {
			...state,
			todos: state.todos.map((v) => (v.id === id ? { ...v, completed } : v)),
		};
	}),
	on(todoActions.delete, (state, { id }): Todo.State => ({ ...state, todos: state.todos.filter((t) => t.id !== id) })),
);
