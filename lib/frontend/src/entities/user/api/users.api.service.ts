import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@shared/tokens';
import { User } from '../model';

@Injectable()
export class UsersApiService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _apiUrl = inject(API_URL) + '/users';

	public post(body: User.Api.Post.Body) {
		return this._httpClient.post<User.Api.Response>(`${this._apiUrl}`, body);
	}

	public getAll(params?: User.Api.GetAll.Params) {
		return this._httpClient.get<User.Api.GetAll.Response>(`${this._apiUrl}`, { params: { ...params } });
	}

	public getOne(path: User.Api.GetOne.Path) {
		return this._httpClient.get<User.Api.Response>(`${this._apiUrl}/${path.id}`);
	}

	public patch(path: User.Api.Patch.Path, body: User.Api.Patch.Body) {
		return this._httpClient.patch<User.Api.Response>(`${this._apiUrl}/${path.id}`, body);
	}

	public delete(path: User.Api.Delete.Path) {
		return this._httpClient.delete<User.Api.Response>(`${this._apiUrl}/${path.id}`);
	}

	public addRole(path: User.Api.AddRole.Path) {
		return this._httpClient.put<User.Api.Response>(`${this._apiUrl}/${path.id}/roles/${path.roleId}`, {});
	}

	public removeRole(path: User.Api.RemoveRole.Path) {
		return this._httpClient.delete<User.Api.Response>(`${this._apiUrl}/${path.id}/roles/${path.roleId}`);
	}
}
