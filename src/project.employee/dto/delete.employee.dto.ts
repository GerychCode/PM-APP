import { IntersectionType } from '@nestjs/swagger';
import { NoValidationEmployeeBaseDto } from './employee.base.dto';
import { ProjectBaseDto } from '../../project/dto/project.base.dto';

export class DeleteEmployeeDto extends IntersectionType(
	NoValidationEmployeeBaseDto,
	ProjectBaseDto,
) {}
