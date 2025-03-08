import { ActionHandler } from '@shared/types';
import { Account } from './account.model';

type AccountActionHandler<P = {}> = ActionHandler<Account.State, P>;

export const getRequestHandler: AccountActionHandler = (state) => ({ ...state, isLoading: true });

export const getFulfillHandler: AccountActionHandler<Account.Action.Get.Fulfill> = (_, { account }) => ({
	isLogged: true,
	isLoading: false,
	error: null,
	account,
});

export const getRejectHandler: AccountActionHandler = (state) => ({
	...state,
	isLogged: false,
	isLoading: false,
	account: null,
});

export const loginRequestHandler: AccountActionHandler<Account.Action.Login.Request> = (state) => ({
	...state,
	isLoading: true,
});

export const loginFulfillHandler: AccountActionHandler<Account.Action.Login.Fulfill> = (_, { account }) => ({
	isLogged: true,
	isLoading: false,
	error: null,
	account,
});

export const loginRejectHandler: AccountActionHandler<Account.Action.Login.Reject> = (_, { error }) => ({
	isLogged: false,
	isLoading: false,
	error,
	account: null,
});
