import { createSelector } from '@ngrx/store';
import { AppStore } from '@shared/interfaces';

const selectTodoFeature = (store: AppStore) => store.todo;

export const selectTodos = createSelector(selectTodoFeature, (state) => state);
