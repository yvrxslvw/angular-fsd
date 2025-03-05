import { HttpErrorResponse } from '@angular/common/http';
import { Todo } from './todo.model';

export interface IGetAllSuccess {
	todos: Todo.Entity[];
}

export interface IGetAllError {
	error: HttpErrorResponse;
}

export interface IToggleCompleted {
	id: number;
	completed: boolean;
}

export interface IDelete {
	id: number;
}
