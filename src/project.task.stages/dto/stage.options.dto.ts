import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class StageOptionsDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsNotEmpty()
	@Expose()
	title: string;

	@ApiProperty({ required: true })
	@IsString()
	@IsOptional()
	@Expose()
	description: string;
}
