import {
	IsAlpha,
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	Validate,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UsersUniqueValidator } from '../../user/validator/users.unique.validator';

export class RegistrationDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsAlpha()
	@Expose()
	name: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsAlpha()
	@Expose()
	surname: string;

	@ApiProperty({
		required: true,
		example: 'Gerych',
	})
	@IsNotEmpty()
	@IsAlpha()
	@Expose()
	@Validate(UsersUniqueValidator, {
		message: 'An account with that login already exists',
	})
	login: string;

	@ApiProperty({
		required: true,
		example: 'gerych@gmail.com',
	})
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	@Validate(UsersUniqueValidator, {
		message: 'An account with that email already exists',
	})
	email: string;

	@ApiProperty({
		required: true,
		example: '+380997693339',
	})
	@IsNotEmpty()
	@IsPhoneNumber('UA')
	@Expose()
	@Validate(UsersUniqueValidator, {
		message: 'An account with that phone already exists',
	})
	phone: string;

	@ApiProperty({
		required: true,
		example: 'qwerty',
	})
	@IsNotEmpty()
	@IsString()
	@Expose()
	password: string;
}
