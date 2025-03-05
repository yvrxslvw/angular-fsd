import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { todoActions, todoApiActions } from './todo.actions';
import { TodoApiService } from '../../api';

@Injectable()
export class TodoEffects {
	readonly #actions$ = inject(Actions);
	readonly #todoApiService = inject(TodoApiService);

	getAllEffect$ = createEffect(() => this.#actions$.pipe(ofType(todoApiActions.getAll), this.#getAllExhaustMap()));

	toggleCompletedEffect$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(todoActions.toggleCompleted),
			exhaustMap(({ id, completed }) => this.#todoApiService.patch({ id }, { completed }).pipe(this.#getAllExhaustMap())),
		),
	);

	deleteEffect$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(todoActions.delete),
			exhaustMap(({ id }) => this.#todoApiService.delete({ id }).pipe(this.#getAllExhaustMap())),
		),
	);

	#getAllExhaustMap() {
		return exhaustMap(() =>
			this.#todoApiService.getAll().pipe(
				map((todos) => todoApiActions.getAllSuccess({ todos })),
				catchError((error) => of(todoApiActions.getAllError({ error: error.message }))),
			),
		);
	}
}
