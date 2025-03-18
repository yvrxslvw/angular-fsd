import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@shared/tokens';
import { Account } from '../model';

@Injectable({
	providedIn: 'root',
})
export class AuthApiService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _apiUrl = inject(API_URL) + '/auth';

	public login(body: Account.Api.Login.Body) {
		return this._httpClient.post<Account.Api.Response>(`${this._apiUrl}/login`, body);
	}

	public register(body: Account.Api.Register.Body) {
		return this._httpClient.post<Account.Api.Response>(`${this._apiUrl}/register`, body);
	}

	public refresh() {
		return this._httpClient.post<Account.Api.Response>(`${this._apiUrl}/refresh`, undefined);
	}

	public logout() {
		return this._httpClient.post(`${this._apiUrl}/logout`, undefined);
	}
}
