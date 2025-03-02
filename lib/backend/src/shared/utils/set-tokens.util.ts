import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserEntity } from '@domains/user';
import { IAccessTokenPayload, IRefreshTokenPayload } from '@shared/interfaces';

export const setTokens = async (user: UserEntity, response: Response, jwtService: JwtService, remember = true) => {
	const accessTokenPayload: IAccessTokenPayload = {
		id: user.id,
		roles: user.roles.map((role) => role.tag),
	};
	const refreshTokenPayload: IRefreshTokenPayload = {
		id: user.id,
	};
	const accessToken = await jwtService.signAsync(accessTokenPayload, { expiresIn: '5m' });
	const refreshToken = await jwtService.signAsync(refreshTokenPayload, { expiresIn: '30d' });
	response
		.cookie('accessToken', accessToken, {
			sameSite: 'none',
			expires: remember ? new Date(Date.now() + 1000 * 60 * 5) : undefined,
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		})
		.cookie('refreshToken', refreshToken, {
			sameSite: 'none',
			expires: remember ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) : undefined,
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		});
	if (!remember) {
		response.cookie('noRemember', 'true', {
			sameSite: 'none',
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		});
	} else {
		response.clearCookie('noRemember', {
			sameSite: 'none',
			path: '/api/auth/refresh',
			secure: true,
			httpOnly: true,
			domain: 'localhost',
		});
	}
};
