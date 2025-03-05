import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart } from './cart.model';

export const cartApiActions = createActionGroup({
	source: 'Cart API',
	events: {
		get: emptyProps(),
		getSuccess: props<Cart.Action.GetSuccess>(),
		getError: props<Cart.Action.GetError>(),
	},
});
