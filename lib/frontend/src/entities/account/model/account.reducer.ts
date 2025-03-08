import { createReducer, on } from '@ngrx/store';
import { accountApiActions } from './account.actions';
import { getFulfillHandler, getRejectHandler, getRequestHandler } from './account.handlers';
import { Account } from './account.model';

const initialState: Account.State = {
	isLogged: false,
	isLoading: false,
	account: null,
};

export const accountReducer = createReducer(
	initialState,
	on(accountApiActions.get.request, getRequestHandler),
	on(accountApiActions.get.fulfill, getFulfillHandler),
	on(accountApiActions.get.reject, getRejectHandler),
	on(accountApiActions.refresh.request, getRequestHandler),
);
