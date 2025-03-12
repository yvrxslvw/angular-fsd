import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@shared/tokens';
import { Account } from '../model';

@Injectable({
	providedIn: 'root',
})
export class AccountApiService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _apiUrl = inject(API_URL) + '/account';

	public get() {
		return this._httpClient.get<Account.Api.Response>(`${this._apiUrl}`);
	}
}
