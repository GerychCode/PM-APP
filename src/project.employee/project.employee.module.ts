import { Module } from '@nestjs/common';
import { ProjectEmployeeController } from './project.employee.controller';
import { ProjectEmployeeService } from './project.employee.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectRolesService } from '../project.roles/project.roles.service';

@Module({
	imports: [
		SequelizeModule.forFeature([
			Users,
			Projects,
			AdminsRoles,
			Admins,
			ProjectsRoles,
			ProjectsEmployee,
		]),
	],
	controllers: [ProjectEmployeeController],
	providers: [ProjectEmployeeService, ProjectRolesService],
})
export class ProjectEmployeeModule {}
