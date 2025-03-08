import { Account } from '@entities/account/model';

export interface AppStore {
	account: Account.State;
}
