import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { selectAccount } from '@entities/account';
import { isAdminUtil } from '../utils';

export const adminGuard: CanActivateFn = () => {
	const store = inject(Store);
	const router = inject(Router);
	return store.select(selectAccount).pipe(
		map((account) => isAdminUtil(account)),
		tap((isAdmin) => !isAdmin && router.navigate(['/']).then()),
	);
};
