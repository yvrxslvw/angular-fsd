import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { isAdmin } from '@shared/utils';
import { accountActions, accountApiActions } from './account.actions';
import { clearErrorHandler, fulfillHandler, fulfillLogoutHandler, loadingHandler, rejectHandler } from './account.handlers';
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

		on(accountActions.clearError, clearErrorHandler),
	),
	extraSelectors: ({ selectAccount }) => ({
		selectIsAdmin: createSelector(selectAccount, (account) => isAdmin(account)),
	}),
});
