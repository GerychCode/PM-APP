import { IntersectionType } from '@nestjs/swagger';
import { ProjectOptionDto } from './project.option.dto';

export class CreateProjectDto extends IntersectionType(ProjectOptionDto) {}
