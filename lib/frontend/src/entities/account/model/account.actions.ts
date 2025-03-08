import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from './account.model';

export const accountApiActions = {
	get: createActionGroup({
		source: 'Account/Get',
		events: {
			request: emptyProps(),
			fulfill: props<Account.Action.Get.Fulfill>(),
			reject: emptyProps(),
		},
	}),
	login: createActionGroup({
		source: 'Account/Login',
		events: {
			request: props<Account.Action.Login.Request>(),
			fulfill: props<Account.Action.Login.Fulfill>(),
			reject: props<Account.Action.Login.Reject>(),
		},
	}),
	refresh: createActionGroup({
		source: 'Account/Refresh',
		events: {
			request: emptyProps(),
		},
	}),
};
