import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, delay, EMPTY, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { BackendException } from '@shared/interfaces';
import { UsersApiService } from '../api';
import { User } from './users.model';

@Injectable()
export class UsersStore extends ComponentStore<User.State> {
	private readonly _usersApiService = inject(UsersApiService);

	public readonly isLoading$ = this.select((state) => state.isLoading);
	public readonly isEndOfData$ = this.select((state) => state.isEndOfData);
	public readonly isSuccess$ = this.select((state) => state.isSuccess);
	public readonly error$ = this.select((state) => state.error);
	public readonly users$ = this.select((state) => state.users);

	public readonly create = this.effect((request$: Observable<User.Action.Create>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			switchMap(({ login, password }) => this._usersApiService.post({ login, password }).pipe(this._fulfillOnePipe())),
		),
	);

	public readonly getAll = this.effect((request$: Observable<User.Action.GetAll>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			delay(1000),
			switchMap(({ search, offset, limit, order, direction }) =>
				this._usersApiService.getAll({ search, offset, limit, order, direction }).pipe(this._fulfillManyPipe()),
			),
		),
	);

	public readonly getOne = this.effect((request$: Observable<User.Action.GetOne>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			switchMap(({ id }) => this._usersApiService.getOne({ id }).pipe(this._fulfillOnePipe())),
		),
	);

	public readonly patch = this.effect((request$: Observable<User.Action.Patch>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			switchMap(({ id, login, password }) =>
				this._usersApiService.patch({ id }, { login, password }).pipe(this._fulfillOnePipe()),
			),
		),
	);

	public readonly delete = this.effect((request$: Observable<User.Action.Delete>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			switchMap(({ id }) =>
				this._usersApiService.delete({ id }).pipe(
					tap((user) => {
						return this.patchState((state) => {
							const users = { ...state.users };
							delete users[user.id];
							return { ...state, isLoading: false, users };
						});
					}),
					catchError(({ error: { messageUI } }: BackendException) =>
						of(this._reject({ error: messageUI || 'Неизвестная ошибка' })),
					),
				),
			),
		),
	);

	public readonly addRole = this.effect((request$: Observable<User.Action.AddRole>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			switchMap(({ id, roleId }) => this._usersApiService.addRole({ id, roleId }).pipe(this._fulfillOnePipe())),
		),
	);

	public readonly removeRole = this.effect((request$: Observable<User.Action.RemoveRole>) =>
		request$.pipe(
			tap(() => this._setLoading()),
			switchMap(({ id, roleId }) => this._usersApiService.removeRole({ id, roleId }).pipe(this._fulfillOnePipe())),
		),
	);

	public readonly clearError = this.updater((state) => ({ ...state, error: null }));

	constructor() {
		super({
			isLoading: false,
			isEndOfData: false,
			isSuccess: null,
			error: null,
			users: {},
		});
	}

	private readonly _fulfillOne = ({ user }: User.Action.FulfillOne) =>
		this.patchState((state) => ({
			...state,
			isLoading: false,
			isSuccess: true,
			users: { ...state.users, [user.id]: user },
		}));
	private readonly _fulfillMany = ({ users }: User.Action.FulfillMany) =>
		this.patchState((state) => ({
			...state,
			isLoading: false,
			isSuccess: true,
			users: users.reduce((acc, current) => ({ ...acc, [current.id]: current }), { ...state.users }),
		}));
	private readonly _reject = ({ error }: User.Action.Reject) => {
		this.patchState(() => ({
			isLoading: false,
			isSuccess: false,
			error,
		}));
		return EMPTY;
	};
	private readonly _setLoading = () => this.patchState(() => ({ isLoading: true, isSuccess: null, error: null }));
	private readonly _setEndOfData = () => this.patchState(() => ({ isEndOfData: true }));

	private readonly _fulfillOnePipe = () =>
		pipe(
			tap<User.Entity>((user) => this._fulfillOne({ user })),
			catchError(({ error: { messageUI } }: BackendException) =>
				of(this._reject({ error: messageUI || 'Неизвестная ошибка' })),
			),
		);

	private readonly _fulfillManyPipe = () =>
		pipe(
			tap<User.Entity[]>((users) => !users.length && this._setEndOfData()),
			tap((users) => this._fulfillMany({ users })),
			catchError(({ error: { messageUI } }: BackendException) =>
				of(this._reject({ error: messageUI || 'Неизвестная ошибка' })),
			),
		);
}
