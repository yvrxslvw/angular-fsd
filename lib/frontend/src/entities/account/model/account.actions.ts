import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from './account.model';

export const accountApiActions = {
	get: createActionGroup({
		source: 'Account Get API',
		events: {
			request: emptyProps(),
			fulfill: props<Account.Action.Fulfill>(),
			reject: props<Account.Action.Reject>(),
		},
	}),
	login: createActionGroup({
		source: 'Account Login API',
		events: {
			request: props<Account.Api.Login.Body>(),
			fulfill: props<Account.Action.Fulfill>(),
			reject: props<Account.Action.Reject>(),
		},
	}),
	register: createActionGroup({
		source: 'Account Register API',
		events: {
			request: props<Account.Api.Register.Body>(),
			fulfill: props<Account.Action.Fulfill>(),
			reject: props<Account.Action.Reject>(),
		},
	}),
	refresh: createActionGroup({
		source: 'Account Refresh API',
		events: {
			request: emptyProps(),
			fulfill: props<Account.Action.Fulfill>(),
			reject: props<Account.Action.Reject>(),
		},
	}),
	logout: createActionGroup({
		source: 'Account Logout API',
		events: {
			request: emptyProps(),
			fulfill: emptyProps(),
			reject: props<Account.Action.Reject>(),
		},
	}),
};
