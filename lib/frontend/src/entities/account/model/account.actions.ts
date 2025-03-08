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
	refresh: createActionGroup({
		source: 'Account/Refresh',
		events: {
			request: emptyProps(),
		},
	}),
};
