import { Module } from '@nestjs/common';
import { AuthController } from '@controllers/auth/auth.controller';

@Module({
	controllers: [AuthController],
})
export class AuthModule {}
