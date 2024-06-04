import { IntersectionType, PickType } from '@nestjs/swagger';
import { GetDataQueryDto } from '../../common/dto/get.data.query.dto';
import { NoValidationOptionalStageBaseDto } from './stage.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { StageOptionsDto } from './stage.options.dto';

export class GetStageDto extends IntersectionType(
	NoValidationOptionalStageBaseDto,
	NoValidationProjectBaseDto,
	PickType(StageOptionsDto, ['title'] as const),
) {}
export class StageModelIncludeDto extends PickType(GetDataQueryDto, [
	'includeProject',
] as const) {}
