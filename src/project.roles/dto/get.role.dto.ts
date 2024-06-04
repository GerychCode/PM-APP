import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { GetDataQueryDto } from '../../common/dto/get.data.query.dto';
import { NoValidationOptionalRoleBaseDto } from './role.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { RoleOptionsDto } from './role.options.dto';

export class GetRoleDto extends IntersectionType(
	NoValidationOptionalRoleBaseDto,
	NoValidationProjectBaseDto,
	PartialType(PickType(RoleOptionsDto, ['title'] as const)),
) {}
export class RoleModelIncludeDto extends PickType(GetDataQueryDto, [
	'includeProject',
] as const) {}
