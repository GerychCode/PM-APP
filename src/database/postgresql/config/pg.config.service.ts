import {
	SequelizeModuleOptions,
	SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Users } from '../models/User/users.model';
import { Admins } from '../models/Admin/admins.model';
import { AdminsRoles } from '../models/Admin/admins.roles.model';
import { Projects } from '../models/Project/projects.model';
import { ProjectsRoles } from '../models/Project/projects.roles.model';
import { ProjectsEmployee } from '../models/Project/projects.employee.model';
import { ProjectsTaskStages } from '../models/Project/projects.task.stages.model';
import { Tasks } from '../models/Task/task.model';
import { TasksComments } from '../models/Task/task.comments.model';

@Injectable()
class SequelizeConfigService implements SequelizeOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createSequelizeOptions(): SequelizeModuleOptions {
		return {
			dialect: 'postgres',
			host: this.configService.get('POSTGRES_HOST'),
			port: parseInt(this.configService.get('POSTGRES_PORT')),
			username: this.configService.get('POSTGRES_DB_USER'),
			password: this.configService.get('POSTGRES_DB_PASSWORD'),
			database: this.configService.get('POSTGRES_DB_NAME'),
			synchronize: true,
			autoLoadModels: true,
			logging: false,
			models: [
				Users,
				Admins,
				AdminsRoles,
				Projects,
				ProjectsRoles,
				ProjectsEmployee,
				ProjectsTaskStages,
				Tasks,
				TasksComments,
			],
		};
	}
}

export default SequelizeConfigService;
