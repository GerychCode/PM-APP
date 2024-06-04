import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Validate,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';

export class CreateCommentsDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	@Validate(RecordExistValidator, [{ model: 'Projects', property: 'id' }], {
		message: 'Project not found',
	})
	projectId: number;

	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	employeeId: number;

	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	taskId: number;

	@ApiProperty({ required: true, maxLength: 255 })
	@IsString()
	@MaxLength(255)
	@Expose()
	text: string;

	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	@Expose()
	@Validate(
		RecordExistValidator,
		[{ model: 'TasksComments', property: 'id' }],
		{
			message: 'Comment not found',
		},
	)
	parentId: number;
}
