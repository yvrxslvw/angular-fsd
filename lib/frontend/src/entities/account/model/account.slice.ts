import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { DEFAULT_API_STATE } from '@shared/constants';
import { isAdmin } from '@shared/utils';
import { accountActions, accountApiActions } from './account.actions';
import { Account } from './account.model';

const initialState: Account.State = {
	isLogged: false,
	account: null,
	api: {
		getProfile: DEFAULT_API_STATE,
		login: DEFAULT_API_STATE,
		register: DEFAULT_API_STATE,
		refresh: DEFAULT_API_STATE,
		logout: DEFAULT_API_STATE,
	},
};

const setIsLoading = (key: Account.Api.Method) => (state: Account.State) => ({
	...state,
	api: { ...state.api, [key]: { ...state.api[key], isLoading: true, error: null } },
});

const setUser =
	(key: Account.Api.Method) =>
	(state: Account.State, { account }: Account.Action.Success) => ({
		...state,
		isLogged: true,
		account,
		api: { ...state.api, [key]: { ...state.api[key], isLoading: false } },
	});

const setError =
	(key: Account.Api.Method) =>
	(state: Account.State, { error }: Account.Action.Error) => ({
		...state,
		api: { ...state.api, [key]: { ...state.api[key], error, isLoading: false } },
	});

export const accountSlice = createFeature({
	name: 'account',
	reducer: createReducer(
		initialState,

		on(accountActions.getProfile, setIsLoading('getProfile')),
		on(accountActions.login, setIsLoading('login')),
		on(accountActions.register, setIsLoading('register')),
		on(accountActions.refresh, setIsLoading('refresh')),
		on(accountActions.logout, setIsLoading('logout')),

		on(accountApiActions.getProfileSuccess, setUser('getProfile')),
		on(accountApiActions.getProfileError, setError('getProfile')),

		on(accountApiActions.loginSuccess, setUser('login')),
		on(accountApiActions.loginError, setError('login')),

		on(accountApiActions.registerSuccess, setUser('register')),
		on(accountApiActions.registerError, setError('register')),

		on(accountApiActions.refreshSuccess, setUser('refresh')),
		on(accountApiActions.refreshError, setError('refresh')),

		on(accountApiActions.logoutSuccess, (state) => ({
			...state,
			isLogged: false,
			account: null,
			api: { ...state.api, logout: { ...state.api.logout, isLoading: false } },
		})),
		on(accountApiActions.logoutError, setError('logout')),
	),
	extraSelectors: ({ selectAccount, selectApi }) => ({
		selectIsAdmin: createSelector(selectAccount, (account) => isAdmin(account)),
		selectApiState: (key: Account.Api.Method) => createSelector(selectApi, (api) => api[key]),
	}),
});
