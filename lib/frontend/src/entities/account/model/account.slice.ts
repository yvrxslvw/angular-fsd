import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { accountApiActions } from '@entities/account';
import { DEFAULT_API_STATE } from '@shared/constants';
import { isAdmin } from '@shared/utils';
import { Account } from './account.model';

const initialState: Account.State = {
	isLogged: false,
	account: null,
	getAccountApi: DEFAULT_API_STATE,
	loginApi: DEFAULT_API_STATE,
	registerApi: DEFAULT_API_STATE,
	refreshApi: DEFAULT_API_STATE,
	logoutApi: DEFAULT_API_STATE,
};

const request = (apiKey: keyof Account.State) => (state: Account.State) => ({
	...state,
	[apiKey]: { isLoading: true, error: null },
});

const fulfill =
	(apiKey: keyof Account.State) =>
	(state: Account.State, payload: Account.Action.Fulfill | ReturnType<typeof accountApiActions.logout.fulfill>) => ({
		...state,
		isLogged: true,
		account: 'account' in payload ? payload.account : null,
		[apiKey]: { isLoading: false, error: null },
	});

const reject =
	(apiKey: keyof Account.State) =>
	(state: Account.State, { error }: Account.Action.Reject) => ({
		...state,
		[apiKey]: { isLoading: false, error },
	});

export const accountSlice = createFeature({
	name: 'account',
	reducer: createReducer(
		initialState,

		on(accountApiActions.get.request, request('getAccountApi')),
		on(accountApiActions.login.request, request('loginApi')),
		on(accountApiActions.register.request, request('registerApi')),
		on(accountApiActions.refresh.request, request('refreshApi')),
		on(accountApiActions.logout.request, request('logoutApi')),

		on(accountApiActions.get.fulfill, fulfill('getAccountApi')),
		on(accountApiActions.login.fulfill, fulfill('loginApi')),
		on(accountApiActions.register.fulfill, fulfill('registerApi')),
		on(accountApiActions.refresh.fulfill, fulfill('refreshApi')),
		on(accountApiActions.logout.fulfill, fulfill('logoutApi')),

		on(accountApiActions.get.reject, reject('getAccountApi')),
		on(accountApiActions.login.reject, reject('loginApi')),
		on(accountApiActions.register.reject, reject('registerApi')),
		on(accountApiActions.refresh.reject, reject('refreshApi')),
		on(accountApiActions.logout.reject, reject('logoutApi')),
	),
	extraSelectors: ({ selectAccount }) => ({
		selectIsAdmin: createSelector(selectAccount, (account) => isAdmin(account)),
	}),
});
