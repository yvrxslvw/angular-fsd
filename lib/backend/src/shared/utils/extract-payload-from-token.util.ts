import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BackendException } from '../exceptions';
import { IAccessTokenPayload } from '../interfaces';
import { extractTokens } from './extract-tokens.util';

export const extractPayloadFromTokenUtil = async (request: Request, jwtService: JwtService): Promise<IAccessTokenPayload> => {
	const { accessToken } = extractTokens(request);
	if (!accessToken) throw new BackendException(HttpStatus.UNAUTHORIZED, 'Недостаточно прав');
	let user: IAccessTokenPayload;

	try {
		user = await jwtService.verifyAsync(accessToken);
	} catch {
		throw new BackendException(HttpStatus.UNAUTHORIZED, 'Недостаточно прав');
	}

	return user;
};
