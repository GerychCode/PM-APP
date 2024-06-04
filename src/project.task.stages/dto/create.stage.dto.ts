import { IntersectionType } from '@nestjs/swagger';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { StageOptionsDto } from './stage.options.dto';

export class CreateStageDto extends IntersectionType(
	NoValidationProjectBaseDto,
	StageOptionsDto,
) {}
