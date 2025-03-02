import { Request } from 'express';

interface Tokens {
	accessToken: string | undefined;
	refreshToken: string | undefined;
}

export const extractTokens = (request: Request): Tokens => {
	return {
		accessToken: request.cookies['accessToken'],
		refreshToken: request.cookies['refreshToken'],
	};
};
