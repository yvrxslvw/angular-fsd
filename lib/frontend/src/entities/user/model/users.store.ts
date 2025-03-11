import { inject, Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { BackendException } from '@shared/interfaces';
import { UsersApiService } from '../api';
import { User } from './users.model';

@Injectable()
export class UsersStore extends ComponentStore<User.State> implements OnDestroy {
	private readonly _usersApiService = inject(UsersApiService);

	private readonly _fulfillOne = this.updater((state, user: User.Entity) => ({
		...state,
		isLoading: false,
		users: { ...state.users, [user.id]: user },
	}));
	private readonly _fulfillMany = this.updater((state, users: User.Entity[]) => ({
		...state,
		isLoading: false,
		users: users.reduce((acc, current) => ({ ...acc, [current.id]: current }), { ...state.users }),
	}));
	private readonly _reject = this.updater((state, error: string) => ({ ...state, isLoading: false, error }));
	private readonly _loading = this.updater((state) => ({ ...state, isLoading: true, error: null }));

	public readonly isLoading$ = this.select((state) => state.isLoading);
	public readonly error$ = this.select((state) => state.error);
	public readonly users$ = this.select((state) => state.users);

	public readonly getOne = this.effect((request$: Observable<User.Action.GetOne>) =>
		request$.pipe(
			tap(() => this._loading()),
			switchMap(({ id }) =>
				this._usersApiService.getOne({ id }).pipe(
					tap((user) => this._fulfillOne(user)),
					catchError(({ error: { messageUI } }: BackendException) => of(this._reject(messageUI))),
				),
			),
		),
	);

	public readonly getAll = this.effect((request$: Observable<User.Action.GetAll>) =>
		request$.pipe(
			tap(() => this._loading()),
			switchMap((params) =>
				this._usersApiService.getAll(params).pipe(
					tap((users) => this._fulfillMany(users)),
					catchError(({ error: { messageUI } }: BackendException) => of(this._reject(messageUI))),
				),
			),
		),
	);

	constructor() {
		super({
			isLoading: false,
			error: null,
			users: {},
		});
	}

	override ngOnDestroy() {
		super.ngOnDestroy();
		console.warn('UsersStore destroyed');
	}
}
