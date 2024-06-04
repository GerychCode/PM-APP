import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { TaskCommentsService } from './task.comments.service';
import { CreateCommentsDto } from './dto/create.comments.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('task.comments')
export class TaskCommentsController {
	constructor(private readonly taskCommentsService: TaskCommentsService) {}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Post('')
	//@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editTask))
	async createComments(@Body() createCommentsDto: CreateCommentsDto) {
		return this.taskCommentsService.createComment(createCommentsDto);
	}
}
