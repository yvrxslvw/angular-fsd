import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { ControllersModule } from '@controllers/controllers.module';
import { SharedModule } from '@shared/shared.module';

@Module({
	imports: [SharedModule, ApplicationModule, ControllersModule],
})
export class AppModule {}
