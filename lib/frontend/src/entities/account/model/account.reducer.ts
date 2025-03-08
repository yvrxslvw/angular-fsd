import { createReducer, on } from '@ngrx/store';
import { accountApiActions } from './account.actions';
import { getHandlers, loginHandlers } from './account.handlers';
import { Account } from './account.model';

const initialState: Account.State = {
	isLogged: false,
	isLoading: false,
	error: null,
	account: null,
};

export const accountReducer = createReducer(
	initialState,
	on(accountApiActions.get.request, getHandlers.request),
	on(accountApiActions.get.fulfill, getHandlers.fulfill),
	on(accountApiActions.get.reject, getHandlers.reject),

	on(accountApiActions.login.request, loginHandlers.request),
	on(accountApiActions.login.fulfill, loginHandlers.fulfill),
	on(accountApiActions.login.reject, loginHandlers.reject),

	on(accountApiActions.refresh.request, getHandlers.request),
);
