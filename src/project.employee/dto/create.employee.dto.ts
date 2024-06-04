import { IntersectionType } from '@nestjs/swagger';
import { ProjectBaseDto } from '../../project/dto/project.base.dto';
import { NoValidationOptionalRoleBaseDto } from '../../project.roles/dto/role.base.dto';
import { UserBaseDto } from '../../user/dto/user.base.dto';

export class CreateEmployeeDto extends IntersectionType(
	ProjectBaseDto,
	NoValidationOptionalRoleBaseDto,
	UserBaseDto,
) {}
