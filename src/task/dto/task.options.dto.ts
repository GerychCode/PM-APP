import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskOptionsDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
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
	duoDate: Date;

	@ApiProperty({ required: true })
	@IsNumber()
	@IsOptional()
	@Expose()
	importance: number = 0;
}
