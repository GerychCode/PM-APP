import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';

export class EmployeeBaseDto {
	@ApiProperty({ required: true })
	@Expose()
	@IsNumber()
	@Validate(
		RecordExistValidator,
		[
			{
				model: 'ProjectsEmployee',
				property: 'id',
				expressionParams: ['projectId'],
			},
		],
		{
			message: 'Employee not found',
		},
	)
	employeeId: number;
}
export class NoValidationEmployeeBaseDto {
	@ApiProperty({ required: false })
	@Expose()
	@IsNumber()
	employeeId?: number;
}
export class OptionalEmployeeBaseDto extends PartialType(EmployeeBaseDto) {}
export class NoValidationOptionalEmployeeBaseDto extends PartialType(
	NoValidationEmployeeBaseDto,
) {}
