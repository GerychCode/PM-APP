import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Permission } from './project.role.permissions.dto';

export class RoleOptionsDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	@Expose()
	title: string;

	@ApiProperty({ required: false })
	@Expose()
	@Type(() => Permission)
	@ValidateNested()
	permission?: Permission;
}
