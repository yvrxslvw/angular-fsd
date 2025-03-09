import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { selectAccount } from '@entities/account';
import { isAdmin } from '../utils';

export const adminGuard: CanActivateFn = () => {
	const store = inject(Store);
	const router = inject(Router);
	return store.select(selectAccount).pipe(
		map((account) => isAdmin(account)),
		tap((isAdmin) => !isAdmin && router.navigate(['/']).then()),
	);
};
