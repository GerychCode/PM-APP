import { IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Permission {
	@ApiProperty({ required: false })
	@Expose()
	@IsOptional()
	@IsBoolean()
	editRoles?: boolean;

	@ApiProperty({ required: false })
	@Expose()
	@IsOptional()
	@IsBoolean()
	editEmployee?: boolean;

	@ApiProperty({ required: false })
	@Expose()
	@IsOptional()
	@IsBoolean()
	editProject?: boolean;

	@ApiProperty({ required: false })
	@Expose()
	@IsOptional()
	@IsBoolean()
	editTask?: boolean;

	@ApiProperty({ required: false })
	@Expose()
	@IsOptional()
	@IsBoolean()
	createTask?: boolean;
}
