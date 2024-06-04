import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ProjectEmployeeService } from './project.employee.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create.employee.dto';
import {
	EmployeeModelIncludeDto,
	GetEmployeeDto,
} from './dto/get.employee.dto';
import { UpdateEmployeeDto } from './dto/update.employee.dto';
import { DeleteEmployeeDto } from './dto/delete.employee.dto';
import { AdminPermissionGuard } from '../auth/guard/admin.permission.guard';
import { AdminPermission } from '../common/enum/user/permissions/admin.permission.enum';
import { PermissionGuard } from '../auth/guard/projects.permission.guard';
import { ProjectRolesPermissionsEnum } from '../project.roles/permissions/project.roles.permissions.enum';

@Controller('project/employee')
export class ProjectEmployeeController {
	constructor(
		private readonly projectEmployeeService: ProjectEmployeeService,
	) {}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Get('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.default))
	async getEmployees(
		@Query() getEmployeeDto: GetEmployeeDto,
		@Query() employeeModelIncludeDto: EmployeeModelIncludeDto,
	) {
		return this.projectEmployeeService.getEmployees(
			getEmployeeDto,
			employeeModelIncludeDto,
		);
	}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Post('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editEmployee))
	async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
		return this.projectEmployeeService.createEmployee(createEmployeeDto);
	}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Patch('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editEmployee))
	async updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
		return this.projectEmployeeService.updateEmployee(updateEmployeeDto);
	}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Delete('')
	@UseGuards(PermissionGuard(ProjectRolesPermissionsEnum.editEmployee))
	async deleteEmployee(
		@Req() req: Request,
		@Body() deleteEmployeeDto: DeleteEmployeeDto,
	) {
		return this.projectEmployeeService.deleteEmployee(
			req,
			deleteEmployeeDto,
		);
	}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Get('/admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	async getEmployeesAdmin(
		@Query() getEmployeeDto: GetEmployeeDto,
		@Query() employeeModelIncludeDto: EmployeeModelIncludeDto,
	) {
		return this.projectEmployeeService.getEmployees(
			getEmployeeDto,
			employeeModelIncludeDto,
		);
	}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Patch('/admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	async updateEmployeeAdmin(@Body() updateEmployeeDto: UpdateEmployeeDto) {
		return this.projectEmployeeService.updateEmployee(updateEmployeeDto);
	}

	@ApiTags('ProjectEmployee')
	@ApiBearerAuth('JWT')
	@Delete('/admin')
	@UseGuards(AdminPermissionGuard(AdminPermission.editProjects))
	async deleteEmployeeAdmin(
		@Req() req: Request,
		@Body() deleteEmployeeDto: DeleteEmployeeDto,
	) {
		return this.projectEmployeeService.deleteEmployee(
			req,
			deleteEmployeeDto,
		);
	}
}
