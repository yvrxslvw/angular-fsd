import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, delay, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { DEFAULT_API_STATE } from '@shared/constants';
import { BackendException } from '@shared/interfaces';
import { UsersApiService } from '../api';
import { User } from './users.model';

@Injectable()
export class UsersStore extends ComponentStore<User.State> {
	private readonly _usersApiService = inject(UsersApiService);

	public readonly users$ = this.select((state) => state.users);

	public readonly post = this.effect((request$: Observable<User.Api.Post.Body>) =>
		request$.pipe(
			tap(() => this._setIsLoading('post', true)),
			switchMap((body) =>
				this._usersApiService.post(body).pipe(
					tap(() => this._setIsLoading('post', false)),
					map((user) => this._setUser(user)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('post', messageUI)),
				),
			),
		),
	);

	public readonly getAll = this.effect((request$: Observable<User.Api.GetAll.Params>) =>
		request$.pipe(
			tap(() => this._setIsLoading('getAll', true)),
			delay(1000),
			switchMap((params) =>
				this._usersApiService.getAll(params).pipe(
					tap(() => this._setIsLoading('getAll', false)),
					tap((users) => this._setIsEndOfData('getAll', !users.length)),
					map((users) => this._setUsers(users)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('getAll', messageUI)),
				),
			),
		),
	);

	public readonly getOne = this.effect((request$: Observable<User.Api.GetOne.Path>) =>
		request$.pipe(
			tap(() => this._setIsLoading('getOne', true)),
			switchMap((path) =>
				this._usersApiService.getOne(path).pipe(
					tap(() => this._setIsLoading('getOne', false)),
					map((user) => this._setUser(user)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('getOne', messageUI)),
				),
			),
		),
	);

	public readonly patch = this.effect((request$: Observable<User.Api.Patch.Path & User.Api.Patch.Body>) =>
		request$.pipe(
			tap(() => this._setIsLoading('patch', true)),
			switchMap(({ id, login, password }) =>
				this._usersApiService.patch({ id }, { login, password }).pipe(
					tap(() => this._setIsLoading('patch', false)),
					map((user) => this._setUser(user)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('patch', messageUI)),
				),
			),
		),
	);

	public readonly delete = this.effect((request$: Observable<User.Api.Delete.Path>) =>
		request$.pipe(
			tap(() => this._setIsLoading('delete', true)),
			switchMap((path) =>
				this._usersApiService.delete(path).pipe(
					tap(() => this._setIsLoading('delete', false)),
					map((user) => this._deleteUser(user)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('delete', messageUI)),
				),
			),
		),
	);

	public readonly addRole = this.effect((request$: Observable<User.Api.AddRole.Path>) =>
		request$.pipe(
			tap(() => this._setIsLoading('addRole', true)),
			switchMap((path) =>
				this._usersApiService.addRole(path).pipe(
					tap(() => this._setIsLoading('addRole', false)),
					map((user) => this._setUser(user)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('addRole', messageUI)),
				),
			),
		),
	);

	public readonly removeRole = this.effect((request$: Observable<User.Api.RemoveRole.Path>) =>
		request$.pipe(
			tap(() => this._setIsLoading('removeRole', true)),
			switchMap((path) =>
				this._usersApiService.removeRole(path).pipe(
					tap(() => this._setIsLoading('removeRole', false)),
					map((user) => this._setUser(user)),
					catchError(({ error: { messageUI } }: BackendException) => this._setError('removeRole', messageUI)),
				),
			),
		),
	);

	constructor() {
		super({
			users: {},
			api: {
				post: DEFAULT_API_STATE,
				getAll: DEFAULT_API_STATE,
				getOne: DEFAULT_API_STATE,
				patch: DEFAULT_API_STATE,
				delete: DEFAULT_API_STATE,
				addRole: DEFAULT_API_STATE,
				removeRole: DEFAULT_API_STATE,
			},
		});
	}

	public getApiState$(key: User.Api.Method) {
		return this.select((state) => state.api[key]);
	}

	private readonly _setUsers = (users: User.Entity[]) =>
		this.patchState((state) => ({
			...state,
			users: users.reduce((acc, user) => ({ ...acc, [user.id]: user }), { ...state.users }),
		}));

	private readonly _setUser = (user: User.Entity) =>
		this.patchState((state) => ({
			...state,
			users: { ...state.users, [user.id]: user },
		}));

	private readonly _deleteUser = (user: User.Entity) => {
		this.patchState((state) => {
			const users = { ...state.users };
			delete users[user.id];
			return {
				...state,
				users,
			};
		});
	};

	private readonly _setIsLoading = (key: User.Api.Method, isLoading: boolean) =>
		this.patchState((state) => ({
			...state,
			api: { ...state.api, [key]: { error: null, isLoading } },
		}));

	private readonly _setError = (key: User.Api.Method, error: string) => {
		this.patchState((state) => ({
			...state,
			api: { ...state.api, [key]: { error, isLoading: false } },
		}));
		return EMPTY;
	};

	private readonly _setIsEndOfData = (key: User.Api.Method, isEndOfData: boolean) => {
		this.patchState((state) => ({
			...state,
			api: { ...state.api, [key]: { ...state.api[key], isEndOfData } },
		}));
		return EMPTY;
	};
}
