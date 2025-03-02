import { Response } from 'express';

export const clearTokens = (response: Response) => {
	response
		.clearCookie('accessToken', {
			sameSite: 'none',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		})
		.clearCookie('refreshToken', {
			sameSite: 'none',
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		})
		.clearCookie('noRemember', {
			sameSite: 'none',
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		});
};
