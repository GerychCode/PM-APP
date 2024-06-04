import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SetUserPasswordDto {
	@ApiProperty({ required: true })
	@IsString()
	@Expose()
	@IsOptional()
	oldPassword: string;

	@ApiProperty({ required: true })
	@IsString()
	@Expose()
	@IsOptional()
	newPassword: string;
}
