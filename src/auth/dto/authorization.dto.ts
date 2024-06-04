import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class AuthorizationDto {
	@ApiProperty({
		required: true,
		example: 'Gerych',
	})
	@IsNotEmpty()
	@IsAlpha()
	@Expose()
	login: string;

	@ApiProperty({
		required: true,
		example: 'qwerty',
	})
	@IsNotEmpty()
	@IsAlpha()
	@Expose()
	password: string;
}
