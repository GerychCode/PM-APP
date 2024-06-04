import {
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { GetDataQueryDto } from '../../common/dto/get.data.query.dto';
import { NoValidationOptionalProjectBaseDto } from './project.base.dto';
import { ProjectOptionDto } from './project.option.dto';

export class GetProjectDto extends IntersectionType(
	NoValidationOptionalProjectBaseDto,
	PartialType(OmitType(ProjectOptionDto, ['description'] as const)),
) {}

export class ProjectModelIncludeDto extends PickType(GetDataQueryDto, [
	'includeEmployee',
	'includeRole',
	'includeStage',
	'includeTask',
	'includeComments',
] as const) {}
