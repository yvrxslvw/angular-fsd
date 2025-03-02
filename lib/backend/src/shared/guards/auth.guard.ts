import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppConfig } from '@shared/config';
import { BackendException } from '@shared/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const token = this.#extractTokenFromCookies(request);
		if (!token) throw new BackendException(HttpStatus.UNAUTHORIZED, 'Недостаточно прав');
		try {
			request['user'] = await this.jwtService.verifyAsync(token, { secret: AppConfig.jwtSecret });
		} catch {
			throw new BackendException(HttpStatus.UNAUTHORIZED, 'Недостаточно прав');
		}
		return true;
	}

	#extractTokenFromCookies(request: Request) {
		return request.cookies['access_token'] as string | undefined;
	}
}
