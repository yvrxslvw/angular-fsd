import { createSelector } from '@ngrx/store';
import { AppStore } from '@shared/interfaces';

const selectTodosFeature = (store: AppStore) => store.todo.todos;
const selectTodosIsLoadingFeature = (store: AppStore) => store.todo.isLoading;
const selectTodosErrorFeature = (store: AppStore) => store.todo.error;

export const selectTodos = createSelector({
	todos: selectTodosFeature,
	isLoading: selectTodosIsLoadingFeature,
	error: selectTodosErrorFeature,
});
