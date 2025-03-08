import { createReducer, on } from '@ngrx/store';
import { accountApiActions } from './account.actions';
import {
	getFulfillHandler,
	getRejectHandler,
	getRequestHandler,
	loginFulfillHandler,
	loginRejectHandler,
	loginRequestHandler,
} from './account.handlers';
import { Account } from './account.model';

const initialState: Account.State = {
	isLogged: false,
	isLoading: false,
	error: null,
	account: null,
};

export const accountReducer = createReducer(
	initialState,
	on(accountApiActions.get.request, getRequestHandler),
	on(accountApiActions.get.fulfill, getFulfillHandler),
	on(accountApiActions.get.reject, getRejectHandler),

	on(accountApiActions.login.request, loginRequestHandler),
	on(accountApiActions.login.fulfill, loginFulfillHandler),
	on(accountApiActions.login.reject, loginRejectHandler),

	on(accountApiActions.refresh.request, getRequestHandler),
);
