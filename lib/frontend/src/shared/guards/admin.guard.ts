import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { accountSlice } from '@entities/account';

export const adminGuard: CanActivateFn = () => {
	const store = inject(Store);
	const router = inject(Router);
	return store.select(accountSlice.selectIsAdmin).pipe(tap((isAdmin) => !isAdmin && router.navigate(['/']).then()));
};
