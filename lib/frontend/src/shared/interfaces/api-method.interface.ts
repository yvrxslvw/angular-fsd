import { ApiResource } from '../enums';

export interface ApiMethod<Path, Body, Params> {
	resource: ApiResource;
	path?: Path;
	body?: Body;
	params?: Params;
}
