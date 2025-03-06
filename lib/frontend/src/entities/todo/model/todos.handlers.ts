import { ActionHandler } from '@shared/types';
import { Todo } from './todo.model';

type TodosActionHandler<P = {}> = ActionHandler<Todo.State, P>;

export const getAllRequestHandler: TodosActionHandler = (state) => ({ ...state, isLoading: true });

export const getAllFulfillHandler: TodosActionHandler<Todo.Action.GetAllFulfilled> = (state, { todos }) => ({
	...state,
	todos,
	isLoading: false,
});

export const getAllRejectHandler: TodosActionHandler<Todo.Action.GetAllRejected> = (state, { error }) => ({
	...state,
	error,
	isLoading: false,
});

export const toggleCompletedHandler: TodosActionHandler<Todo.Action.ToggleCompleted> = (state, { id, completed }) => ({
	...state,
	todos: state.todos.map((v) => (v.id === id ? { ...v, completed } : v)),
});

export const deleteHandler: TodosActionHandler<Todo.Action.Delete> = (state, { id }) => ({
	...state,
	todos: state.todos.filter((t) => t.id !== id),
});
