import { ActionHandler } from '@shared/types';
import { User } from './users.model';

type UsersActionHandler<P = {}> = ActionHandler<User.State, P>;

const replaceOrPushUser = (users: User.Entity[] | null, newUser: User.Entity) => {
	const index = users?.findIndex((u) => u.id === newUser.id);
	if (index && index !== -1 && users) users[index] = newUser;
	else users?.push(newUser);
	return users;
};

export const fulfillOneHandler: UsersActionHandler<User.Action.FulfillOne> = (state, { user }) => ({
	...state,
	isLoading: false,
	users: replaceOrPushUser(state.users, user),
});

export const fulfillManyHandler: UsersActionHandler<User.Action.FulfillMany> = (state, { users }) => ({
	...state,
	isLoading: false,
	users,
});

export const rejectHandler: UsersActionHandler<User.Action.Reject> = (state, { error }) => ({
	...state,
	isLoading: false,
	error,
});

export const loadingHandler: UsersActionHandler = (state) => ({ ...state, isLoading: true, error: null });
