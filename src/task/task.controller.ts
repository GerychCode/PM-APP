import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from '../auth/guard/projects.permission.guard';
import { ProjectRolesPermissionsEnum } from '../project.roles/permissions/project.roles.permissions.enum';
import { GetTaskDto, TaskModelIncludeDto } from './dto/get.task.dto';
import { DeleteTaskDto } from './dto/delete.task.dto';
import { AdminPermissionGuard } from '../auth/guard/admin.permission.guard';
import { AdminPermission } from '../common/enum/user/permissions/admin.permission.enum';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Get('')
	getTask(
		@Query() getTaskDto: GetTaskDto,
		@Query() taskModelIncludeDto: TaskModelIncludeDto,
	) {
		return this.taskService.getTask(getTaskDto, taskModelIncludeDto);
	}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Post('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editTask))
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.taskService.createTask(createTaskDto);
	}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Patch('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editTask))
	updateTask(@Body() updateTask: UpdateTaskDto) {
		return this.taskService.updateTask(updateTask);
	}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Delete('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editTask))
	deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
		return this.taskService.deleteTask(deleteTaskDto);
	}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Patch('/admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	updateTaskAdmin(@Body() updateTask: UpdateTaskDto) {
		return this.taskService.updateTask(updateTask);
	}

	@ApiTags('Task')
	@ApiBearerAuth('JWT')
	@Delete('/admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	deleteTaskAdmin(@Body() deleteTaskDto: DeleteTaskDto) {
		return this.taskService.deleteTask(deleteTaskDto);
	}
}
