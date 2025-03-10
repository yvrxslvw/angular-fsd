import { createActionGroup, props } from '@ngrx/store';
import { User } from './users.model';

export const usersApiActions = createActionGroup({
	source: 'Users',
	events: {
		fulfillOne: props<User.Action.FulfillOne>(),
		fulfillMany: props<User.Action.FulfillMany>(),
		reject: props<User.Action.Reject>(),

		create: props<User.Action.Create>(),
		getAll: props<User.Action.GetAll>(),
		getOne: props<User.Action.GetOne>(),
		patch: props<User.Action.Patch>(),
		delete: props<User.Action.Delete>(),
		addRole: props<User.Action.AddRole>(),
		removeRole: props<User.Action.RemoveRole>(),
	},
});
