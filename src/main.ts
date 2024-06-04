import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {
	BadRequestException,
	ValidationError,
	ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('/api');
	const config = new DocumentBuilder()
		.setTitle('PM WEB | API')
		.setVersion('1.0')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'JWT',
		)
		.addTag('pmApp')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new BadRequestException(
					validationErrors.flatMap((error) =>
						error.children && error.children.length
							? error.children.map((childError) => ({
									field: `${error.property}.${childError.property}`,
									error: Object.values(
										childError.constraints,
									).join(', '),
								}))
							: {
									field: error.property,
									error: Object.values(
										error.constraints,
									).join(', '),
								},
					),
				);
			},
			stopAtFirstError: false,
			forbidUnknownValues: false,
			transform: true,
			transformOptions: {
				excludeExtraneousValues: true,
				exposeUnsetFields: false,
			},
		}),
	);
	SwaggerModule.setup('documentation', app, document);
	app.use(cookieParser());
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
