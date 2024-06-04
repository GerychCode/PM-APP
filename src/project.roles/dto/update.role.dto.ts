import { IntersectionType, PartialType } from '@nestjs/swagger';
import { NoValidationRoleBaseDto } from './role.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { RoleOptionsDto } from './role.options.dto';

export class UpdateRoleDto extends IntersectionType(
	NoValidationRoleBaseDto,
	NoValidationProjectBaseDto,
	PartialType(RoleOptionsDto),
) {}
