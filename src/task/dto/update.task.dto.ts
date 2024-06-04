import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { TaskBaseDto } from './task.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';
import { EmployeeBaseDto } from '../../project.employee/dto/employee.base.dto';
import { StageBaseDto } from '../../project.task.stages/dto/stage.base.dto';
import { TaskOptionsDto } from './task.options.dto';

export class UpdateTaskDto extends IntersectionType(
	TaskBaseDto,
	NoValidationProjectBaseDto,
	EmployeeBaseDto,
	StageBaseDto,
	PartialType(OmitType(TaskOptionsDto, ['description'] as const)),
) {}
