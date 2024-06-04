import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { NoValidationEmployeeBaseDto } from './employee.base.dto';
import { ProjectBaseDto } from '../../project/dto/project.base.dto';
import { NoValidationRoleBaseDto } from '../../project.roles/dto/role.base.dto';

export class UpdateEmployeeDto extends IntersectionType(
	NoValidationEmployeeBaseDto,
	ProjectBaseDto,
	NoValidationRoleBaseDto,
) {}
