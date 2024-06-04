import { IsNumber, IsString, Validate } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';

export class StageBaseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	@Type(() => Number)
	@Validate(
		RecordExistValidator,
		[
			{
				model: 'ProjectsTaskStages',
				property: 'id',
				expressionParams: ['projectId'],
			},
		],
		{
			message: 'Stage not found',
		},
	)
	stageId: number;
}
export class NoValidationStageBaseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	@Type(() => Number)
	stageId: number;
}

export class OptionalStageBaseDto extends PartialType(StageBaseDto) {}
export class NoValidationOptionalStageBaseDto extends PartialType(
	NoValidationStageBaseDto,
) {}
