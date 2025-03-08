import { Account } from '@entities/account';

export interface AppStore {
	account: Account.State;
}
