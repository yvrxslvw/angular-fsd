import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BackendException, ValidationException } from '@shared/exceptions';
import { IException } from '@shared/interfaces';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException | ValidationException | BackendException | Error | unknown, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const request = context.getRequest<Request>();
		const response = context.getResponse<Response>();
		const parsedException = this.#parseException(exception, request);

		response.status(parsedException.status).json(parsedException);
	}

	#parseException(
		exception: HttpException | ValidationException | BackendException | Error | unknown,
		request: Request,
	): IException {
		if (exception instanceof HttpException) {
			return {
				dateTime: new Date(),
				endpoint: `${request.method} ${request.url}`,
				status: exception.getStatus(),
				messageUI: exception.message,
			};
		} else if (exception instanceof ValidationException) {
			return {
				dateTime: new Date(),
				endpoint: `${request.method} ${request.url}`,
				status: HttpStatus.BAD_REQUEST,
				messageUI: 'Ошибка валидации',
				data: exception.errors,
			};
		} else if (exception instanceof BackendException) {
			return {
				dateTime: new Date(),
				endpoint: `${request.method} ${request.url}`,
				status: exception.status,
				messageUI: exception.messageUI,
				messageDebug: exception.messageDebug,
				data: exception.data,
			};
		} else if (exception instanceof Error) {
			console.error(exception);
			return {
				dateTime: new Date(),
				endpoint: `${request.method} ${request.url}`,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				messageUI: 'Произошла непредвиденная ошибка',
				messageDebug: exception.message,
				data: exception,
			};
		} else {
			console.error(exception);
			return {
				dateTime: new Date(),
				endpoint: `${request.method} ${request.url}`,
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				messageUI: 'Произошла непредвиденная ошибка',
				messageDebug: 'Unknown error',
				data: exception,
			};
		}
	}
}
