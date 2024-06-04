import { IntersectionType } from '@nestjs/swagger';
import { RoleBaseDto } from './role.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';

export class DeleteRoleDto extends IntersectionType(
	RoleBaseDto,
	NoValidationProjectBaseDto,
) {}
