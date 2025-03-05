import { Account } from '@entities/account';
import { Cart } from '@entities/cart';
import { Todo } from '@entities/todo';

export interface AppStore {
	todo: Todo.State;
	cart: Cart.State;
	account: Account.State;
}
