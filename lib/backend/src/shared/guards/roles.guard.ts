import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { BackendException } from '@shared/exceptions';
import { IAccessTokenPayload } from '@shared/interfaces';
import { extractTokens } from '@shared/utils';
import { ROLES_TOKEN } from 'shared/tokens';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_TOKEN, [context.getHandler(), context.getClass()]);
		if (!requiredRoles || !requiredRoles.length) return true;
		const request = context.switchToHttp().getRequest();
		const { accessToken } = extractTokens(request);
		if (!accessToken) throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		try {
			const payload = await this.jwtService.verifyAsync<IAccessTokenPayload>(accessToken);
			request['user'] = payload;
			return payload.roles.some((role) => requiredRoles.includes(role));
		} catch {
			throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		}
	}
}
