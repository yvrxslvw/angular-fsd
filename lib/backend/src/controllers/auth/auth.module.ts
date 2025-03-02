import { AuthController } from '@controllers/auth/auth.controller';
import { Module } from '@nestjs/common';

@Module({
	controllers: [AuthController],
})
export class AuthModule {}
