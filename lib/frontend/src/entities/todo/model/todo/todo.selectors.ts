import { AppStore } from '@shared/interfaces';

export const selectTodos = (store: AppStore) => store.todo;
