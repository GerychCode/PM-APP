import { IntersectionType } from '@nestjs/swagger';
import { ProjectBaseDto } from '../../project/dto/project.base.dto';
import { OptionalEmployeeBaseDto } from '../../project.employee/dto/employee.base.dto';
import { StageBaseDto } from '../../project.task.stages/dto/stage.base.dto';
import { TaskOptionsDto } from './task.options.dto';

export class CreateTaskDto extends IntersectionType(
	ProjectBaseDto,
	OptionalEmployeeBaseDto,
	StageBaseDto,
	TaskOptionsDto,
) {}
