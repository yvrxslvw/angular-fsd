import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AccountApiService } from '../api';

@Injectable({
	providedIn: 'root',
})
export class AccountEffects {
	readonly #actions$ = inject(Actions);
	readonly #accountApiService = inject(AccountApiService);
}
