import { ActionHandler } from '@shared/types';
import { Account } from './account.model';

type AccountActionHandler<P = {}> = ActionHandler<Account.State, P>;

export const getHandlers = {
	request: ((state) => ({ ...state, isLoading: true })) as AccountActionHandler,
	fulfill: ((_, { account }) => ({
		isLogged: true,
		isLoading: false,
		error: null,
		account,
	})) as AccountActionHandler<Account.Action.Get.Fulfill>,
	reject: ((state) => ({
		...state,
		isLogged: false,
		isLoading: false,
		account: null,
	})) as AccountActionHandler,
};

export const loginHandlers = {
	request: ((state) => ({
		...state,
		isLoading: true,
	})) as AccountActionHandler<Account.Action.Login.Request>,
	fulfill: ((_, { account }) => ({
		isLogged: true,
		isLoading: false,
		error: null,
		account,
	})) as AccountActionHandler<Account.Action.Login.Fulfill>,
	reject: ((_, { error }) => ({
		isLogged: false,
		isLoading: false,
		error,
		account: null,
	})) as AccountActionHandler<Account.Action.Login.Reject>,
};

export const registerHandlers = {
	request: ((state) => ({
		...state,
		isLoading: true,
	})) as AccountActionHandler<Account.Action.Register.Request>,
	fulfill: ((_, { account }) => ({
		isLogged: true,
		isLoading: false,
		error: null,
		account,
	})) as AccountActionHandler<Account.Action.Register.Fulfill>,
	reject: ((_, { error }) => ({
		isLogged: false,
		isLoading: false,
		error,
		account: null,
	})) as AccountActionHandler<Account.Action.Register.Reject>,
};

export const logoutHandlers = {
	request: ((state) => ({
		...state,
		isLoading: true,
	})) as AccountActionHandler,
	fulfill: ((_) => ({
		isLogged: false,
		isLoading: false,
		error: null,
		account: null,
	})) as AccountActionHandler,
	reject: ((state, { error }) => ({
		...state,
		isLoading: false,
		error,
	})) as AccountActionHandler<Account.Action.Logout.Reject>,
};
