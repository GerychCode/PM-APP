import { IsNumber, Validate } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';

export class ProjectBaseDto {
	@ApiProperty({ required: true })
	@Expose()
	@IsNumber()
	@Type(() => Number)
	@Validate(RecordExistValidator, [{ model: 'Projects', property: 'id' }], {
		message: 'Project not found',
	})
	projectId: number;
}
export class NoValidationProjectBaseDto {
	@ApiProperty({ required: true })
	@Expose()
	@IsNumber()
	@Type(() => Number)
	projectId: number;
}

export class OptionalProjectBaseDto extends PartialType(ProjectBaseDto) {}
export class NoValidationOptionalProjectBaseDto extends PartialType(
	NoValidationProjectBaseDto,
) {}
