import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from './account.model';

export const accountApiActions = createActionGroup({
	source: 'api/account',
	events: {
		getProfileSuccess: props<Account.Action.Success>(),
		getProfileError: props<Account.Action.Error>(),

		loginSuccess: props<Account.Action.Success>(),
		loginError: props<Account.Action.Error>(),

		registerSuccess: props<Account.Action.Success>(),
		registerError: props<Account.Action.Error>(),

		refreshSuccess: props<Account.Action.Success>(),
		refreshError: props<Account.Action.Error>(),

		logoutSuccess: emptyProps(),
		logoutError: props<Account.Action.Error>(),
	},
});

export const accountActions = createActionGroup({
	source: 'account',
	events: {
		getProfile: emptyProps(),
		login: props<Account.Api.Login.Body>(),
		register: props<Account.Api.Register.Body>(),
		refresh: emptyProps(),
		logout: emptyProps(),
	},
});
