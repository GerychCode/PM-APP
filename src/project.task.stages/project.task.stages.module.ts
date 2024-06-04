import { Module } from '@nestjs/common';
import { ProjectTaskStagesController } from './project.task.stages.controller';
import { ProjectTaskStagesService } from './project.task.stages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { ProjectsTaskStages } from '../database/postgresql/models/Project/projects.task.stages.model';
import { ProjectService } from '../project/project.service';
import { ProjectEmployeeService } from '../project.employee/project.employee.service';
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
			ProjectsTaskStages,
		]),
	],
	controllers: [ProjectTaskStagesController],
	providers: [ProjectTaskStagesService],
})
export class ProjectTaskStagesModule {}
