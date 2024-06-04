import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ProjectOptionDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	@Expose()
	title: string;

	@ApiProperty({ required: false, maxLength: 2000 })
	@Expose()
	@IsString()
	@IsOptional()
	@MaxLength(2000)
	@Expose()
	description?: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@Expose()
	dateOfStart: Date;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@Expose()
	duoDate: Date;

	@ApiProperty({ required: false })
	@Expose()
	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	private?: boolean;
}
