import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@shared/tokens';
import { Account } from '../model';

@Injectable({
	providedIn: 'root',
})
export class AccountApiService {
	readonly #httpClient = inject(HttpClient);
	readonly #apiUrl = inject(API_URL);

	public get() {
		return this.#httpClient.get<Account.Api.Get.Response>(`${this.#apiUrl}`);
	}
}
