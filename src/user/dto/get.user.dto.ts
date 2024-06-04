import { IsAlpha, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { NoValidationOptionalUserBaseDto } from './user.base.dto';

export class GetUserDto extends IntersectionType(
	NoValidationOptionalUserBaseDto,
) {
	@ApiProperty({ required: false })
	@IsAlpha()
	@Expose()
	@IsOptional()
	name?: string;

	@ApiProperty({ required: false })
	@IsAlpha()
	@Expose()
	@IsOptional()
	surname?: string;

	@ApiProperty({ required: false })
	@IsAlpha()
	@Expose()
	@IsOptional()
	login?: string;

	@ApiProperty({ required: false })
	@IsEmail()
	@Expose()
	@IsOptional()
	email?: string;

	@ApiProperty({ required: false })
	@IsPhoneNumber('UA')
	@Expose()
	@IsOptional()
	phone?: string;
}
