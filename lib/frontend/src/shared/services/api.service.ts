import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiMethod } from '../interfaces';
import { API_URL } from '../tokens';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _apiUrl = inject(API_URL);

	public get<Return = {}, Path extends Record<string, string | number> = {}, Params = {}>(method: ApiMethod<Path, {}, Params>) {
		const { resource, path, params } = method;
		const endpoint = path ? '/' + Object.values(path).join('/') : '';
		return this._httpClient.get<Return>(`${this._apiUrl}/${resource}${endpoint}`, {
			params: { ...params },
		});
	}

	public post<Return = {}, Path extends Record<string, string | number> = {}, Body = {}, Params = {}>(
		method: ApiMethod<Path, Body, Params>,
	) {
		const { resource, path, body, params } = method;
		const endpoint = path ? '/' + Object.values(path).join('/') : '';
		return this._httpClient.post<Return>(`${this._apiUrl}/${resource}${endpoint}`, body, {
			params: { ...params },
		});
	}

	public put<Return = {}, Path extends Record<string, string | number> = {}, Body = {}, Params = {}>(
		method: ApiMethod<Path, Body, Params>,
	) {
		const { resource, path, body, params } = method;
		const endpoint = path ? '/' + Object.values(path).join('/') : '';
		return this._httpClient.put<Return>(`${this._apiUrl}/${resource}${endpoint}`, body, {
			params: { ...params },
		});
	}

	public patch<Return = {}, Path extends Record<string, string | number> = {}, Body = {}, Params = {}>(
		method: ApiMethod<Path, Body, Params>,
	) {
		const { resource, path, body, params } = method;
		const endpoint = path ? '/' + Object.values(path).join('/') : '';
		return this._httpClient.patch<Return>(`${this._apiUrl}/${resource}${endpoint}`, body, {
			params: { ...params },
		});
	}

	public delete<Return = {}, Path extends Record<string, string | number> = {}, Params = {}>(
		method: ApiMethod<Path, {}, Params>,
	) {
		const { resource, path, params } = method;
		const endpoint = path ? '/' + Object.values(path).join('/') : '';
		return this._httpClient.delete<Return>(`${this._apiUrl}/${resource}${endpoint}`, {
			params: { ...params },
		});
	}
}
