import { IsNumber, IsString, Validate } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RecordExistValidator } from '../../common/dto/validator/record.exist.validator';

export class RoleBaseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	@Type(() => Number)
	@Validate(
		RecordExistValidator,
		[
			{
				model: 'ProjectsRoles',
				property: 'id',
				expressionParams: ['projectId'],
			},
		],
		{
			message: 'Role not found',
		},
	)
	roleId: number;
}
export class NoValidationRoleBaseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	@Expose()
	@Type(() => Number)
	roleId: number;
}

export class OptionalRoleBaseDto extends PartialType(RoleBaseDto) {}
export class NoValidationOptionalRoleBaseDto extends PartialType(
	NoValidationRoleBaseDto,
) {}
