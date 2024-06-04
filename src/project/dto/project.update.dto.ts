import { IntersectionType, PartialType } from '@nestjs/swagger';
import { NoValidationProjectBaseDto } from './project.base.dto';
import { ProjectOptionDto } from './project.option.dto';

export class ProjectUpdateDto extends IntersectionType(
	NoValidationProjectBaseDto,
	PartialType(ProjectOptionDto),
) {}
