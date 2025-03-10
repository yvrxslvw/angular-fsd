import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { UsersApiService } from '../api';

@Injectable()
export class UsersEffects {
	private readonly _actions$ = inject(Actions);
	private readonly _usersApiService = inject(UsersApiService);
}
