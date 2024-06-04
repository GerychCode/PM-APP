import { IsEmail, IsPhoneNumber, Validate, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UsersUniqueValidator } from '../validator/users.unique.validator';

export class UpdateUserDto {
	@ApiProperty({ required: true })
	@IsOptional()
	@Expose()
	name?: string;

	@ApiProperty({ required: true })
	@IsOptional()
	@Expose()
	surname?: string;

	@ApiProperty({ required: true })
	@IsOptional()
	@Expose()
	@Validate(UsersUniqueValidator, {
		message: 'An account with that login already exists',
	})
	login?: string;

	@ApiProperty({ required: true })
	@IsEmail()
	@IsOptional()
	@Expose()
	@Validate(UsersUniqueValidator, {
		message: 'An account with that email already exists',
	})
	email?: string;

	@ApiProperty({ required: true })
	@IsPhoneNumber('UA')
	@IsOptional()
	@Expose()
	@Validate(UsersUniqueValidator, {
		message: 'An account with that phone already exists',
	})
	phone?: string;
}
