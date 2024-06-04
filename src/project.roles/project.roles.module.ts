import { Module } from '@nestjs/common';
import { ProjectRolesController } from './project.roles.controller';
import { ProjectRolesService } from './project.roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { ProjectService } from '../project/project.service';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';

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
	controllers: [ProjectRolesController],
	providers: [ProjectRolesService],
})
export class ProjectRolesModule {}
