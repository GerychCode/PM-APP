import {
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { GetDataQueryDto } from '../../common/dto/get.data.query.dto';
import { OptionalTaskBaseDto } from './task.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import {
	EmployeeBaseDto,
	OptionalEmployeeBaseDto,
} from '../../project.employee/dto/employee.base.dto';
import {
	OptionalStageBaseDto,
	StageBaseDto,
} from '../../project.task.stages/dto/stage.base.dto';
import { TaskOptionsDto } from './task.options.dto';

export class GetTaskDto extends IntersectionType(
	OptionalTaskBaseDto,
	NoValidationProjectBaseDto,
	OptionalEmployeeBaseDto,
	OptionalStageBaseDto,
	PartialType(OmitType(TaskOptionsDto, ['description'] as const)),
) {}
export class TaskModelIncludeDto extends PickType(GetDataQueryDto, [
	'includeProject',
	'includeEmployee',
	'includeStage',
] as const) {}
