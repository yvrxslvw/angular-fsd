import { createReducer } from '@ngrx/store';
import { Account } from './account.model';

const initialState: Account.State = {
	isLoading: false,
	error: null,
	account: null,
	selectedCompanyId: null,
};

export const accountReducer = createReducer(initialState);
