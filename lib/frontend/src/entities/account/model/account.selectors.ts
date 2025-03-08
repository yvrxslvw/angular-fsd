import { createSelector } from '@ngrx/store';
import { AppStore } from '@shared/interfaces';

export const selectAccountState = (store: AppStore) => store.account;

export const selectAccountIsLogged = createSelector(selectAccountState, (state) => state.isLogged);

export const selectAccountIsLoading = createSelector(selectAccountState, (state) => state.isLoading);

export const selectAccountError = createSelector(selectAccountState, (state) => state.error);

export const selectAccount = createSelector(selectAccountState, (state) => state.account);
