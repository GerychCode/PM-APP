import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { ProjectRolesModule } from './project.roles/project.roles.module';
import SequelizeConfigService from './database/postgresql/config/pg.config.service';
import cacheConfigService from './database/redis/config/cache.config.service';
import { RecordExistValidator } from './common/dto/validator/record.exist.validator';
import { ProjectEmployeeModule } from './project.employee/project.employee.module';
import { ProjectTaskStagesController } from './project.task.stages/project.task.stages.controller';
import { ProjectTaskStagesModule } from './project.task.stages/project.task.stages.module';
import { TaskModule } from './task/task.module';
import { TaskCommentsModule } from './task.comments/task.comments.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath:
				process.env.NODE_ENV === 'production'
					? '.env.production'
					: '.env.development',
			isGlobal: true,
		}),
		SequelizeModule.forRootAsync({
			useClass: SequelizeConfigService,
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			useClass: cacheConfigService,
		}),
		UserModule,
		AuthModule,
		ProjectModule,
		ProjectRolesModule,
		ProjectEmployeeModule,
		ProjectTaskStagesModule,
		TaskModule,
		TaskCommentsModule,
	],
	providers: [RecordExistValidator],
	controllers: [],
})
export class AppModule {}
