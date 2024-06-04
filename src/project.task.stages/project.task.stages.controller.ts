import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ProjectTaskStagesService } from './project.task.stages.service';
import { CreateStageDto } from './dto/create.stage.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateStageDto } from './dto/update.stage.dto';
import { GetStageDto, StageModelIncludeDto } from './dto/get.stage.dto';
import { DeleteStageDto } from './dto/delete.stage.dto';
import { PermissionGuard } from '../auth/guard/projects.permission.guard';
import { ProjectRolesPermissionsEnum } from '../project.roles/permissions/project.roles.permissions.enum';
import { AdminPermissionGuard } from '../auth/guard/admin.permission.guard';
import { AdminPermission } from '../common/enum/user/permissions/admin.permission.enum';

@Controller('project/task/stages')
export class ProjectTaskStagesController {
	constructor(
		private readonly projectTaskStagesService: ProjectTaskStagesService,
	) {}

	@ApiTags('ProjectTaskStage')
	@ApiBearerAuth('JWT')
	@Get('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.default))
	getStage(
		@Query() getStageDto: GetStageDto,
		@Query() stageModelIncludeDto: StageModelIncludeDto,
	) {
		return this.projectTaskStagesService.getStage(
			getStageDto,
			stageModelIncludeDto,
		);
	}

	@ApiTags('ProjectTaskStage')
	@ApiBearerAuth('JWT')
	@Post('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.administrator))
	createStage(@Body() createStageDto: CreateStageDto) {
		return this.projectTaskStagesService.createStage(createStageDto);
	}
	@ApiTags('ProjectTaskStage')
	@ApiBearerAuth('JWT')
	@Patch('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.administrator))
	updateStage(@Body() updateStageDto: UpdateStageDto) {
		return this.projectTaskStagesService.updateStage(updateStageDto);
	}
	@ApiTags('ProjectTaskStage')
	@ApiBearerAuth('JWT')
	@Delete('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.administrator))
	deleteStage(@Body() deleteStageDto: DeleteStageDto) {
		return this.projectTaskStagesService.deleteStage(deleteStageDto);
	}
	@ApiTags('ProjectTaskStage')
	@ApiBearerAuth('JWT')
	@Patch('admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	updateStageAdmin(@Body() updateStageDto: UpdateStageDto) {
		return this.projectTaskStagesService.updateStage(updateStageDto);
	}
	@ApiTags('ProjectTaskStage')
	@ApiBearerAuth('JWT')
	@Delete('admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	deleteStageAdmin(@Body() deleteStageDto: DeleteStageDto) {
		return this.projectTaskStagesService.deleteStage(deleteStageDto);
	}
}
