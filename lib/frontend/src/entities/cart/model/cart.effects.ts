import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CartApiService } from '../api';

@Injectable({
	providedIn: 'root',
})
export class CartEffects {
	readonly #actions$ = inject(Actions);
	readonly #cartApiService = inject(CartApiService);
}
