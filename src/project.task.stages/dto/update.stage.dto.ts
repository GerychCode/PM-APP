import { IntersectionType, PartialType } from '@nestjs/swagger';
import { StageBaseDto } from './stage.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { StageOptionsDto } from './stage.options.dto';

export class UpdateStageDto extends IntersectionType(
	StageBaseDto,
	NoValidationProjectBaseDto,
	PartialType(StageOptionsDto),
) {}
