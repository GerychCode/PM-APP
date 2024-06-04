import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class GetDataQueryDto {
	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeUser: boolean = false;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeProject: boolean = false;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeRole: boolean = false;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeEmployee: boolean = false;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeStage: boolean = false;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeTask: boolean = false;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Expose()
	@Type(() => Boolean)
	includeComments: boolean = false;
}
