import { ActionHandler } from '@shared/types';
import { Account } from './account.model';

type AccountActionHandler<P = {}> = ActionHandler<Account.State, P>;

export const fulfillHandler: AccountActionHandler<Account.Action.Fulfill> = (state, { account }) => ({
	...state,
	isLogged: true,
	isLoading: false,
	account,
});

export const rejectHandler: AccountActionHandler<Account.Action.Reject> = (state, { error }) => ({
	...state,
	isLoading: false,
	error,
});

export const loadingHandler: AccountActionHandler = (state) => ({ ...state, isLoading: true, error: null });

export const fulfillLogoutHandler: AccountActionHandler = (state) => ({
	...state,
	isLogged: false,
	isLoading: false,
	account: null,
});
