import { IntersectionType } from '@nestjs/swagger';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { RoleOptionsDto } from './role.options.dto';

export class CreateRoleDto extends IntersectionType(
	NoValidationProjectBaseDto,
	RoleOptionsDto,
) {}
