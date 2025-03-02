import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '@shared/config';

@Global()
@Module({
	imports: [
		CqrsModule.forRoot(),
		JwtModule.register({
			global: true,
			secret: AppConfig.jwtSecret,
			signOptions: { expiresIn: '5m' },
		}),
	],
})
export class SharedModule {}
