import { createFeature, createReducer, on } from '@ngrx/store';
import { accountApiActions } from './account.actions';
import { fulfillHandler, fulfillLogoutHandler, loadingHandler, rejectHandler } from './account.handlers';
import { Account } from './account.model';

const initialState: Account.State = {
	isLogged: false,
	isLoading: false,
	error: null,
	account: null,
};

export const accountSlice = createFeature({
	name: 'account',
	reducer: createReducer(
		initialState,
		on(accountApiActions.fulfill, fulfillHandler),
		on(accountApiActions.reject, rejectHandler),

		on(accountApiActions.get, loadingHandler),
		on(accountApiActions.login, loadingHandler),
		on(accountApiActions.register, loadingHandler),
		on(accountApiActions.refresh, loadingHandler),
		on(accountApiActions.logout, loadingHandler),
		on(accountApiActions.fulfillLogout, fulfillLogoutHandler),
	),
});
