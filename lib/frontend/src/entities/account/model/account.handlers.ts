import { ActionHandler } from '@shared/types';
import { Account } from './account.model';

type AccountActionHandler<P = {}> = ActionHandler<Account.State, P>;

export const getRequestHandler: AccountActionHandler = (state) => ({ ...state, isLoading: true });

export const getFulfillHandler: AccountActionHandler<Account.Action.Get.Fulfill> = (_, { account }) => ({
	isLogged: true,
	isLoading: false,
	account,
});

export const getRejectHandler: AccountActionHandler = () => ({ isLogged: false, isLoading: false, account: null });
