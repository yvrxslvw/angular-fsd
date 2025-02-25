import { Todo } from '@entities/todo';

export interface AppStore {
	todo: Todo.State;
}
