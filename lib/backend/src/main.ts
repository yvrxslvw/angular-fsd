import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfig } from '@shared/config';
import { generateSwagger } from '@shared/swagger';
import { AppModule } from './app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, { cors: { origin: 'http://localhost:4200' } });

	app.setGlobalPrefix('/api');
	app.useGlobalPipes(new ValidationPipe());
	generateSwagger(app);

	await app.listen(AppConfig.appPort, AppConfig.appHost);
};
void bootstrap();
