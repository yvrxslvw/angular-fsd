import { createFeature, createReducer, on } from '@ngrx/store';
import { usersApiActions } from './users.actions';
import { fulfillManyHandler, fulfillOneHandler, rejectHandler } from './users.handlers';
import { User } from './users.model';

const initialState: User.State = {
	isLoading: false,
	error: null,
	users: null,
};

export const usersSlice = createFeature({
	name: 'users',
	reducer: createReducer(
		initialState,
		on(usersApiActions.fulfillOne, fulfillOneHandler),
		on(usersApiActions.fulfillMany, fulfillManyHandler),
		on(usersApiActions.reject, rejectHandler),
	),
});
