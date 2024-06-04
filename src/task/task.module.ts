import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { ProjectsTaskStages } from '../database/postgresql/models/Project/projects.task.stages.model';
import { Tasks } from '../database/postgresql/models/Task/task.model';
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
			Tasks,
		]),
	],
	controllers: [TaskController],
	providers: [TaskService, ProjectEmployeeService, ProjectRolesService],
})
export class TaskModule {}
