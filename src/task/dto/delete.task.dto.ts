import { IntersectionType } from '@nestjs/swagger';
import { TaskBaseDto } from './task.base.dto';
import { NoValidationProjectBaseDto } from '../../project/dto/project.base.dto';

export class DeleteTaskDto extends IntersectionType(
	TaskBaseDto,
	NoValidationProjectBaseDto,
) {}
