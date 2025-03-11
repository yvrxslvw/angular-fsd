import { ActionHandler } from '@shared/types';
import { User } from './users.model';

type UsersActionHandler<P = {}> = ActionHandler<User.State, P>;

export const fulfillOneHandler: UsersActionHandler<User.Action.FulfillOne> = (state, { user }) => ({
	...state,
	isLoading: false,
	users: { ...state.users, [user.id]: user },
});

export const fulfillManyHandler: UsersActionHandler<User.Action.FulfillMany> = (state, { users }) => ({
	...state,
	isLoading: false,
	users: users.reduce((acc, current) => ({ ...acc, [current.id]: current }), { ...state.users }),
});

export const rejectHandler: UsersActionHandler<User.Action.Reject> = (state, { error }) => ({
	...state,
	isLoading: false,
	error,
});

export const loadingHandler: UsersActionHandler = (state) => ({ ...state, isLoading: true, error: null });
