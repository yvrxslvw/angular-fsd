import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from './account.model';

export const accountApiActions = createActionGroup({
	source: 'Account API',
	events: {
		fulfill: props<Account.Action.Fulfill>(),
		reject: props<Account.Action.Reject>(),

		get: emptyProps(),
		login: props<Account.Action.Login.Request>(),
		register: props<Account.Action.Register.Request>(),
		refresh: emptyProps(),
		logout: emptyProps(),
		fulfillLogout: emptyProps(),
	},
});

export const accountActions = createActionGroup({
	source: 'Account',
	events: {
		clearError: emptyProps(),
	},
});
