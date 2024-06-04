import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ProjectRolesService } from './project.roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { CreateRoleDto } from './dto/create.role.dto';
import { GetRoleDto, RoleModelIncludeDto } from './dto/get.role.dto';
import { ProjectUpdateDto } from '../project/dto/project.update.dto';
import { UpdateRoleDto } from './dto/update.role.dto';
import { DeleteRoleDto } from './dto/delete.role.dto';
import { AdminPermissionGuard } from '../auth/guard/admin.permission.guard';
import { AdminPermission } from '../common/enum/user/permissions/admin.permission.enum';
import { PermissionGuard } from '../auth/guard/projects.permission.guard';
import { ProjectRolesPermissionsEnum } from './permissions/project.roles.permissions.enum';

@Controller('project/roles')
export class ProjectRolesController {
	constructor(private readonly projectRoleService: ProjectRolesService) {}

	@ApiTags('ProjectRoles')
	@ApiBearerAuth('JWT')
	@Get('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.default))
	getRole(
		@Query() getRoleDto: GetRoleDto,
		@Query() roleModelIncludeDto: RoleModelIncludeDto,
	) {
		return this.projectRoleService.getProjectRole(
			getRoleDto,
			roleModelIncludeDto,
		);
	}

	@ApiTags('ProjectRoles')
	@ApiBearerAuth('JWT')
	@Post('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editRoles))
	createRole(@Body() createRoleDto: CreateRoleDto) {
		return this.projectRoleService.createRole(createRoleDto);
	}

	@ApiTags('ProjectRoles')
	@ApiBearerAuth('JWT')
	@Patch('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editRoles))
	updateRole(@Body() updateRoleDto: UpdateRoleDto) {
		return this.projectRoleService.updateRole(updateRoleDto);
	}

	@ApiTags('ProjectRoles')
	@ApiBearerAuth('JWT')
	@Delete('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editRoles))
	deleteRole(@Query() deleteRoleDto: DeleteRoleDto) {
		return this.projectRoleService.deleteRole(deleteRoleDto);
	}

	@ApiTags('ProjectRoles')
	@ApiBearerAuth('JWT')
	@Patch('admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	updateRoleAdmin(@Body() updateRoleDto: UpdateRoleDto) {
		return this.projectRoleService.updateRole(updateRoleDto);
	}

	@ApiTags('ProjectRoles')
	@ApiBearerAuth('JWT')
	@Delete('admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	deleteRoleAdmin(@Param() deleteRoleDto: DeleteRoleDto) {
		return this.projectRoleService.deleteRole(deleteRoleDto);
	}
}
