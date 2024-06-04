import { IntersectionType } from '@nestjs/swagger';
import { StageBaseDto } from './stage.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';

export class DeleteStageDto extends IntersectionType(
	StageBaseDto,
	NoValidationProjectBaseDto,
) {}
