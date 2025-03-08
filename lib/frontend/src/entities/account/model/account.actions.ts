import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from './account.model';

export const accountApiActions = {
	get: createActionGroup({
		source: 'account',
		events: {
			request: emptyProps(),
			fulfill: props<Account.Action.Get.Fulfill>(),
		},
	}),
};
