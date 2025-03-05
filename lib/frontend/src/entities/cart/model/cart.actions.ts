import { createActionGroup, props } from '@ngrx/store';
import { Cart } from './cart.model';

interface testInterfacePayloadKstati {
	ogo: string;
}

export const cartApiActions = createActionGroup({
	source: 'Cart API',
	events: {
		get: props<testInterfacePayloadKstati>(),
		getSuccess: props<Cart.Action.GetSuccess>(),
		getError: props<Cart.Action.GetError>(),
	},
});
