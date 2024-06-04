import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';
import { ProjectEmployeeService } from '../project.employee/project.employee.service';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { ProjectRolesService } from '../project.roles/project.roles.service';

@Module({
	imports: [
		SequelizeModule.forFeature([
			Users,
			Projects,
			AdminsRoles,
			Admins,
			ProjectsEmployee,
			ProjectsRoles,
		]),
	],
	controllers: [ProjectController],
	providers: [ProjectService, ProjectEmployeeService, ProjectRolesService],
})
export class ProjectModule {}
