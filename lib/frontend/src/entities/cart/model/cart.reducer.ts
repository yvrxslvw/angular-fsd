import { createReducer } from '@ngrx/store';
import { Cart } from './cart.model';

const initialState: Cart.State = {
	isLoading: false,
	error: null,
	cart: null,
};

export const cartReducer = createReducer(initialState);
