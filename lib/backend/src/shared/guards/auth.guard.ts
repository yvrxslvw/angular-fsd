import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BackendException } from '@shared/exceptions';
import { extractTokens } from '@shared/utils';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const { accessToken } = extractTokens(request);
		if (!accessToken) throw new BackendException(HttpStatus.UNAUTHORIZED, 'Недостаточно прав');
		try {
			request['user'] = await this.jwtService.verifyAsync(accessToken);
		} catch {
			throw new BackendException(HttpStatus.UNAUTHORIZED, 'Недостаточно прав');
		}
		return true;
	}
}
