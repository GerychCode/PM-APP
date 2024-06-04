import { IsNumber, IsString, Validate } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';
import { Tasks } from '../../database/postgresql/models/Task/task.model';

export class TaskBaseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	@Validate(
		RecordExistValidator,
		[
			{
				model: 'Tasks',
				property: 'id',
				expressionParams: ['projectId'],
			},
		],
		{
			message: 'Task not found',
		},
	)
	taskId: number;
}
export class NoValidationTaskBaseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	taskId: number;
}

export class OptionalTaskBaseDto extends PartialType(TaskBaseDto) {}
export class NoValidationTaskStageBaseDto extends PartialType(
	NoValidationTaskBaseDto,
) {}
