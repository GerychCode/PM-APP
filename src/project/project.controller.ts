import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/project.create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { UserBaseDto } from '../user/dto/user.base.dto';
import { AdminPermissionGuard } from '../auth/guard/admin.permission.guard';
import { AdminPermission } from '../common/enum/user/permissions/admin.permission.enum';
import { ProjectUpdateDto } from './dto/project.update.dto';
import { GetProjectDto, ProjectModelIncludeDto } from './dto/get.project.dto';
import { PermissionGuard } from '../auth/guard/projects.permission.guard';
import { ProjectRolesPermissionsEnum } from '../project.roles/permissions/project.roles.permissions.enum';
import {
	NoValidationOptionalProjectBaseDto,
	NoValidationProjectBaseDto,
} from './dto/project.base.dto';

@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Get('')
	getUsersProjects(
		@Req() req: any,
		@Query() getProjectDto: GetProjectDto,
		@Query() projectModelIncludeDto: ProjectModelIncludeDto,
	) {
		return this.projectService.getProjects(
			getProjectDto,
			projectModelIncludeDto,
			req,
			null,
		);
	}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(JwtAuthGuard)
	@Post('')
	createProject(@Req() req: any, @Body() createProjectDto: CreateProjectDto) {
		return this.projectService.createProject(req, createProjectDto);
	}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.administrator))
	@Patch('')
	updateProject(@Req() req: any, @Body() updateProjectDto: ProjectUpdateDto) {
		return this.projectService.updateProject(req, updateProjectDto, false);
	}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.owner))
	@Delete('')
	deleteProject(
		@Query() noValidationProjectBaseDto: NoValidationProjectBaseDto,
	) {
		return this.projectService.deleteProject(noValidationProjectBaseDto);
	}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	@Get('admin')
	getUsersProjectsAdmin(
		@Req() req: any,
		@Query() getProjectDto: GetProjectDto,
		@Query() projectModelIncludeDto: ProjectModelIncludeDto,
		@Query() baseDto?: UserBaseDto,
	) {
		return this.projectService.getProjects(
			getProjectDto,
			projectModelIncludeDto,
			req,
			baseDto,
		);
	}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	@Patch('/admin')
	updateProjectAdmin(
		@Req() req: any,
		@Body() updateProjectDto: ProjectUpdateDto,
	) {
		return this.projectService.updateProject(req, updateProjectDto, true);
	}

	@ApiTags('Projects')
	@ApiBearerAuth('JWT')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	@Delete('admin')
	deleteProjectAdmin(
		@Query() noValidationProjectBaseDto: NoValidationProjectBaseDto,
	) {
		return this.projectService.deleteProject(noValidationProjectBaseDto);
	}
}
