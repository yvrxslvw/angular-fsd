import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@shared/tokens';
import { Role } from '../model';

@Injectable()
export class RolesApiService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _apiUrl = inject(API_URL) + '/roles';

	public post(body: Role.Api.Post.Body) {
		return this._httpClient.post<Role.Api.Response>(`${this._apiUrl}`, body);
	}

	public getAll(params?: Role.Api.GetAll.Params) {
		return this._httpClient.get<Role.Api.GetAll.Response>(`${this._apiUrl}`, { params: { ...params } });
	}

	public getOne(path: Role.Api.GetOne.Path) {
		return this._httpClient.get<Role.Api.Response>(`${this._apiUrl}/${path.id}`);
	}

	public patch(path: Role.Api.Patch.Path, body: Role.Api.Patch.Body) {
		return this._httpClient.patch<Role.Api.Response>(`${this._apiUrl}/${path.id}`, body);
	}

	public delete(path: Role.Api.Delete.Path) {
		return this._httpClient.delete<Role.Api.Response>(`${this._apiUrl}/${path.id}`);
	}
}
