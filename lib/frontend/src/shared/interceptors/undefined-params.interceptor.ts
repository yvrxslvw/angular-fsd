import { HttpInterceptorFn } from '@angular/common/http';

export const undefinedParamsInterceptor: HttpInterceptorFn = (req, next) => {
	let params = req.params;
	params.keys().forEach((key) => {
		if (params.get(key) === 'undefined') params = params.delete(key);
	});
	return next(req.clone({ params }));
};
