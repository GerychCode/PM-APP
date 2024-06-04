import { Module } from '@nestjs/common';
import { TaskCommentsService } from './task.comments.service';
import { TaskCommentsController } from './task.comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/postgresql/models/User/users.model';
import { Projects } from '../database/postgresql/models/Project/projects.model';
import { AdminsRoles } from '../database/postgresql/models/Admin/admins.roles.model';
import { Admins } from '../database/postgresql/models/Admin/admins.model';
import { ProjectsEmployee } from '../database/postgresql/models/Project/projects.employee.model';
import { ProjectsRoles } from '../database/postgresql/models/Project/projects.roles.model';
import { ProjectsTaskStages } from '../database/postgresql/models/Project/projects.task.stages.model';
import { Tasks } from '../database/postgresql/models/Task/task.model';
import { TasksComments } from '../database/postgresql/models/Task/task.comments.model';

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
			TasksComments,
		]),
	],
	controllers: [TaskCommentsController],
	providers: [TaskCommentsService],
})
export class TaskCommentsModule {}
