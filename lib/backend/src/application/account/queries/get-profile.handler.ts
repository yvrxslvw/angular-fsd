import { GetProfileQuery } from '@domains/account';
import { GetOneUserQuery, UserEntity } from '@domains/user';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { extractPayloadFromTokenUtil } from '@shared/utils';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly jwtService: JwtService,
	) {}

	public async execute(query: GetProfileQuery): Promise<UserEntity> {
		const { request } = query;
		const payload = await extractPayloadFromTokenUtil(request, this.jwtService);
		return this.queryBus.execute(new GetOneUserQuery(payload.id));
	}
}
