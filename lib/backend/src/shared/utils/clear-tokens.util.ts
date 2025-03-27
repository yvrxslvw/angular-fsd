import { Response } from 'express';
import { AppConfig } from '@shared/config';

export const clearTokens = (response: Response) => {
	response
		.clearCookie('accessToken', {
			sameSite: AppConfig.appMode === 'production' ? 'strict' : 'none',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		})
		.clearCookie('refreshToken', {
			sameSite: AppConfig.appMode === 'production' ? 'strict' : 'none',
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		})
		.clearCookie('noRemember', {
			sameSite: AppConfig.appMode === 'production' ? 'strict' : 'none',
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		});
};
